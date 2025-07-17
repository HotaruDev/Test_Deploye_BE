import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'; // Import crypto module
import 'dotenv/config'; // Pastikan dotenv dimuat
import User from '../models/user.js';
import EmailVerificationToken from '../models/emailVerificationToken.js'; // Import EmailVerificationToken model
import { sendEmail } from '../utils/emailService.js'; // Import sendEmail utility
import { UserInstance, EmailVerificationTokenInstance } from '../utils/interfaces.js';

const JWT_SECRET = process.env.JWT_SECRET as string;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'; // Tambahkan BASE_URL dari .env atau default

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash with salt rounds = 10

    const newUserInstance = await User.create({
      email,
      password: hashedPassword, // Changed from password_hash
      role: 'USER', // Default role
      is_verified: false, // Set to false by default
    });
    const newUser = newUserInstance.get() as import('../utils/interfaces.js').UserAttributes;
    console.log('New User UUID:', newUser.uuid); // Tambahkan log ini

    // Buat token verifikasi email
    try {
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24); // Token berlaku selama 24 jam

      await EmailVerificationToken.create({
        user_uuid: newUser.uuid,
        token: verificationToken,
        expires_at: expiresAt,
      });

      // Kirim email verifikasi
      const verificationLink = `${BASE_URL}/api/v1/auth/verify-email?token=${verificationToken}`;
      const emailContent = `
        <h1>Verifikasi Email Anda</h1>
        <p>Terima kasih telah mendaftar. Silakan klik tautan berikut untuk memverifikasi alamat email Anda:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
        <p>Tautan ini akan kedaluwarsa dalam 24 jam.</p>
      `;

      await sendEmail({
        to: newUser.email,
        subject: 'Verifikasi Email Akun Seraloka Anda',
        html: emailContent,
      });
    } catch (emailError) {
      console.error('Error during email verification token creation or sending:', emailError);
      // Anda bisa memilih untuk mengembalikan error yang lebih spesifik di sini atau tetap 500
      return res.status(500).json({ message: 'Internal server error during email verification.' });
    }

    return res.status(201).json({ message: 'User registered successfully. Please check your email for verification.' });
  } catch (error) {
    console.error('Registration error (before email verification):', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const userInstance = await User.findOne({ where: { email } });
    const user = userInstance?.get() as import('../utils/interfaces.js').UserAttributes | undefined;
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Changed from user.password_hash
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Tambahkan pengecekan verifikasi email
    if (!user.is_verified) {
      return res.status(403).json({ message: 'Akun belum diverifikasi. Silakan cek email Anda untuk verifikasi.' });
    }

    // Buat JWT token
    const token = jwt.sign(
      { uuid: user.uuid, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' } // Token berlaku selama 1 jam
    );

    return res.status(200).json({ message: 'Login successful', user, token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query; // Ambil token dari query parameter

  if (typeof token !== 'string' || !token) { // Pastikan token adalah string tunggal
    return res.status(400).json({ message: 'Verification token is required and must be a string' });
  }

  try {
    const emailTokenInstance = await EmailVerificationToken.findOne({ where: { token } });
    const emailToken = emailTokenInstance?.get() as import('../utils/interfaces.js').EmailVerificationTokenAttributes | undefined;

    if (!emailToken) {
      return res.status(404).json({ message: 'Invalid or expired verification link' });
    }

    // Periksa apakah token sudah kedaluwarsa
    if (emailToken.expires_at < new Date()) {
      await emailTokenInstance?.destroy(); // Hapus token yang kedaluwarsa
      return res.status(400).json({ message: 'Verification link has expired. Please request a new one.' });
    }

    const userInstance = await User.findByPk(emailToken.user_uuid);
    if (!userInstance) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = userInstance.get() as import('../utils/interfaces.js').UserAttributes;

    if (user.is_verified) {
      await emailTokenInstance?.destroy(); // Hapus token jika user sudah terverifikasi
      return res.status(200).json({ message: 'Email already verified.' });
    }

    // Update langsung di instance Model
    await userInstance.update({ is_verified: true });

    await emailTokenInstance?.destroy(); // Hapus token setelah verifikasi berhasil

    return res.status(200).json({ message: 'Email verified successfully!' });
  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 
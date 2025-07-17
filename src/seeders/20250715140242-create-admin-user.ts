import bcrypt from 'bcrypt';
import { QueryInterface, DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize';
import 'dotenv/config'; // Pastikan dotenv dimuat untuk akses variabel lingkungan

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface: QueryInterface, DataTypesParam: typeof DataTypes) {
    console.log('Running seeder: create-admin-user');
    // Ambil kata sandi dan email ADMIN dari variabel lingkungan
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'default_admin_password';

    // Kata sandi dan email USER di-hardcode (sesuai permintaan)
    const userEmail = 'user@example.com';
    const userPassword = 'user123';

    const hashedPasswordAdmin = await bcrypt.hash(adminPassword, 10);
    const hashedPasswordUser = await bcrypt.hash(userPassword, 10);

    await queryInterface.bulkInsert('Users', [
      {
        uuid: Sequelize.literal('gen_random_uuid()'),
        email: adminEmail,
        password: hashedPasswordAdmin, // Changed from password_hash
        role: 'ADMIN',
        is_verified: true, // New field
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        uuid: Sequelize.literal('gen_random_uuid()'),
        email: userEmail,
        password: hashedPasswordUser, // Changed from password_hash
        role: 'USER',
        is_verified: false, // New field
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface: QueryInterface, DataTypesParam: typeof DataTypes) {
    // Hapus berdasarkan email admin dari variabel lingkungan dan email user yang di-hardcode
    await queryInterface.bulkDelete('Users', { email: [process.env.ADMIN_EMAIL || 'admin@example.com', 'user@example.com'] }, {});
  }
}; 
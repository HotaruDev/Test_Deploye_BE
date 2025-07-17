import { Router, Request, Response } from 'express';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = Router();

// Contoh endpoint administratif yang dilindungi
router.get('/dashboard', authenticateToken, authorizeRole('ADMIN'), (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Admin Dashboard!', user: (req as any).user });
});

// Anda bisa menambahkan rute admin lainnya di sini

export default router; 
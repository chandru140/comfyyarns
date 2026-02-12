import express from 'express';
import { adminLogin, verifyToken, createAdmin, validateLogin } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', validateLogin, adminLogin);
router.post('/verify', authMiddleware, verifyToken);

// Only allow admin creation in development mode
if (process.env.NODE_ENV === 'development') {
  router.post('/create', createAdmin);
}

export default router;

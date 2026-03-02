import express from 'express';
import { adminLogin, verifyToken, createAdmin, validateLogin } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', validateLogin, adminLogin);
router.post('/verify', authMiddleware, verifyToken);

// Admin creation is ONLY available when ALLOW_ADMIN_CREATE=true is explicitly set.
// Never accessible in production unless you consciously set this env var.
if (process.env.ALLOW_ADMIN_CREATE === 'true') {
  router.post('/create', createAdmin);
}

export default router;

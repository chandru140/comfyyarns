import express from 'express';
import { uploadImage, deleteImage } from '../controllers/uploadController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes (Admin only)
router.post('/', authMiddleware, uploadImage);
router.delete('/:publicId', authMiddleware, deleteImage);

export default router;

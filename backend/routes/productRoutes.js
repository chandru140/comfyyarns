import express from 'express';
import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/:id', getProductById);

// Protected routes (Admin only)
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;

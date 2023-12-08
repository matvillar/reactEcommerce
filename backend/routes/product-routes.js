import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createReview,
} from '../controllers/product-controller.js';
import { protectRoutes } from '../middleware/authMiddleware.js';

// get all products
router.get('/', getProducts);

// get product by id
router.get('/:id', getProductById);

// create new review
router.route('/:id/reviews').post(protectRoutes, createReview);
export default router;

import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/product-controller.js';

// get all products
router.get('/', getProducts);

// get product by id
router.get('/:id', getProductById);

export default router;

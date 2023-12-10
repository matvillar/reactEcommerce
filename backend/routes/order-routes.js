import express from 'express';
const router = express.Router();
import {
  createOrderItems,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
} from '../controllers/order-controller.js';
import { protectRoutes, adminRoutes } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(protectRoutes, createOrderItems)
  .get(protectRoutes, adminRoutes, getAllOrders);

// get user's orders
router.route('/userorders').get(protectRoutes, getUserOrders);

// get order by id
router.route('/:id').get(protectRoutes, getOrderById);

// update order to paid
router.route('/:id/paid').put(protectRoutes, updateOrderToPaid);

// update order to delivered
router
  .route('/:id/delivered')
  .put(protectRoutes, adminRoutes, updateOrderToDelivered);

export default router;

import asyncHandler from 'express-async-handler';
import Order from '../models/order-model.js';

// @desc    Create new order
// @route   POST /api/orders

const createOrderItems = asyncHandler(async (req, res) => {
  res.send('Order created');
});


// @desc    Get Logged in user orders
// @route   GET /api/orders/myorders
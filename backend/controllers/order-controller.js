import asyncHandler from 'express-async-handler';
import Order from '../models/order-model.js';

// @desc    Create new order
// @route   POST /api/orders

const createOrderItems = asyncHandler(async (req, res) => {
  res.send('Order created');
});

// @desc    Get Logged in user orders
// @route   GET /api/orders/userorders

const getUserOrders = asyncHandler(async (req, res) => {
  res.send('Get user orders');
});

// @desc    Get order by ID
// @route   GET /api/orders/:id

const getOrderById = asyncHandler(async (req, res) => {
  res.send('Get order by ID');
});

// @desc    Update order => paid
// @route   GET /api/orders/:id/paid

const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('Update order to paid');
});

// <--- Admin Routes --->

// @desc    Update order => delivered
// @route   GET /api/orders/:id/delivered

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('Update order to delivered');
});

// @desc    Get all orders
// @route   GET /api/orders

const getAllOrders = asyncHandler(async (req, res) => {
  res.send('Get all orders');
});

export {
  createOrderItems,
  getUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getAllOrders,
};

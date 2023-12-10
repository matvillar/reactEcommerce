import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';
import e from 'express';

// Protected routes middleware

const protectRoutes = asyncHandler(async (req, res, next) => {
  let token;

  // Check JWT from cookie

  token = req.cookies.jwt; // this was set in user-controller.js
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); // exclude password
      next();
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(401);
      throw new Error('Not authorized, token is invalid');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin routes middleware

const adminRoutes = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // if user is admin, then go to next middleware, move on to the next function
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
});

export { protectRoutes, adminRoutes };

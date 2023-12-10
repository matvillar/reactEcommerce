import express from 'express';
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/user-controller.js';
import { protectRoutes, adminRoutes } from '../middleware/authMiddleware.js';

router
  .route('/')
  .post(registerUser)
  .get(protectRoutes, adminRoutes, getAllUsers);
router.post('/logout', logoutUser);
router.post('/login', loginUser);
router
  .route('/profile')
  .get(protectRoutes, getUserProfile)
  .put(protectRoutes, updateUserProfile);

// Admin routes
router
  .route('/:id')
  .delete(protectRoutes, adminRoutes, deleteUser)
  .get(protectRoutes, adminRoutes, getUserById)
  .put(protectRoutes, adminRoutes, updateUser);

export default router;

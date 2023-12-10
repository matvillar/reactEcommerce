import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   Post /api/users/login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await User.findOne({ email: email });
  if (checkUser && (await checkUser.matchPassword(password))) {
    // matchPassword is a method in userModel.js
    generateToken(res, checkUser._id);
    res.status(200).json({
      _id: checkUser._id,
      name: checkUser.name,
      email: checkUser.email,
      isAdmin: checkUser.isAdmin,
    });
  } else {
    res.status(401); // 401 means unauthorized
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   Post /api/users

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Log user out, we need to destroy the token
// @route   Post /api/users/logout

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: 'Logged out successfully',
  });
});

// @desc    Get user profile
// @route   Get /api/users/profile

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id); // req.user is set in authMiddleware.js
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('OoOoPss! User not found');
  }
});

// @desc    Update user profile
// @route   Put /api/users/profile we do not id, because we use the token to get the user id

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save(); // save to database

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('OoOoPss! User not found');
  }
});

// @desc    Get all users
// @route   Get /api/users  This route is protected and only admins can access it

const getAllUsers = asyncHandler(async (req, res) => {
  res.send('Get all users');
});

// @desc    Delete user
// @route   Delete /api/users/:id  This route is protected and only admins can access it

const deleteUser = asyncHandler(async (req, res) => {
  res.send('Delete user');
});

// @desc    Get user by id
// @route   Get /api/users/:id  This route is protected and only admins can access it

const getUserById = asyncHandler(async (req, res) => {
  res.send('Get user by id');
});

// @desc    Update user
// @route   Put /api/users/:id  This route is protected and only admins can access it

const updateUser = asyncHandler(async (req, res) => {
  res.send('Update user');
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
};

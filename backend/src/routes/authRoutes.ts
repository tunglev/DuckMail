import express from 'express';
import {
  register,
  login,
  getCurrentUser
} from '../controllers/authController';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user
router.post('/me', getCurrentUser);

export default router;
import express from 'express';
import messageRoutes from './messageRoutes';
import userRoutes from './userRoutes';
import authRoutes from './authRoutes';

const router = express.Router();

router.use('/messages', messageRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;
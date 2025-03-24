import express from 'express';
import messageRoutes from './messageRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/messages', messageRoutes);
router.use('/users', userRoutes);

export default router; 
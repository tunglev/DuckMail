import express from 'express';
import {
  getAllMessages,
  getMessagesByRecipient,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
  getMessagesByUsername
} from '../controllers/messageController';

const router = express.Router();

// Get all messages
router.get('/', getAllMessages);

// Get messages by recipient
router.get('/recipient/:recipient', getMessagesByRecipient);

// Get messages by username (either as sender or recipient)
router.get('/user/:username', getMessagesByUsername);

// Get a single message by ID
router.get('/:id', getMessageById);

// Create a new message
router.post('/', createMessage);

// Update a message
router.put('/:id', updateMessage);

// Delete a message
router.delete('/:id', deleteMessage);

export default router;
import { Request, Response } from 'express';
import Message, { IMessage } from '../models/Message';

// Get all messages
export const getAllMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await Message.find({});
    res.status(200).json({ success: true, data: messages });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get messages by recipient
export const getMessagesByRecipient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipient } = req.params;
    const messages = await Message.find({ recipient });
    res.status(200).json({ success: true, data: messages });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get messages by email (either as sender or recipient)
export const getMessagesByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    
    if (!email) {
      res.status(400).json({ success: false, error: 'Email is required' });
      return;
    }
    
    // Find messages where the user's email is either the sender or recipient
    const messages = await Message.find({
      $or: [
        { recipient: email }
      ]
    });
    
    res.status(200).json({ success: true, data: messages });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single message by ID
export const getMessageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);
    
    if (!message) {
      res.status(404).json({ success: false, error: 'Message not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: message });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new message
export const createMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sender, recipient, subject, body, priority, type } = req.body;
    
    if (!sender || !recipient || !subject || !body || !priority || !type) {
      res.status(400).json({ success: false, error: 'Please provide all required fields' });
      return;
    }
    
    const newMessage = await Message.create({ sender, recipient, subject, body, priority, type });
    res.status(201).json({ success: true, data: newMessage });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a message
export const updateMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedMessage) {
      res.status(404).json({ success: false, error: 'Message not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: updatedMessage });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a message
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedMessage = await Message.findByIdAndDelete(id);
    
    if (!deletedMessage) {
      res.status(404).json({ success: false, error: 'Message not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
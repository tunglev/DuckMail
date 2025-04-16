import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username, firstName, lastName, password } = req.body;
    
    if (!email || !username || !firstName || !lastName || !password) {
      res.status(400).json({ success: false, error: 'Please provide all required fields' });
      return;
    }
    
    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ success: false, error: 'Email already in use' });
      return;
    }
    
    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      res.status(400).json({ success: false, error: 'Username already in use' });
      return;
    }
    
    const newUser = await User.create({ email, username, firstName, lastName, password });
    res.status(201).json({ success: true, data: newUser });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // If trying to update email, check if it's available
    if (updateData.email) {
      const existingEmail = await User.findOne({ email: updateData.email }) as IUser | null;
      if (existingEmail && existingEmail._id && existingEmail._id.toString() !== id) {
        res.status(400).json({ success: false, error: 'Email already in use' });
        return;
      }
    }
    
    // If trying to update username, check if it's available
    if (updateData.username) {
      const existingUsername = await User.findOne({ username: updateData.username }) as IUser | null;
      if (existingUsername && existingUsername._id && existingUsername._id.toString() !== id) {
        res.status(400).json({ success: false, error: 'Username already in use' });
        return;
      }
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedUser) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
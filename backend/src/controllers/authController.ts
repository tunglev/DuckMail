import { Request, Response } from 'express';
import User, { IUser } from '../models/User';

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
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
    
    // Create user with password (no encryption in development mode as specified)
    const newUser = await User.create({ 
      email, 
      username, 
      firstName, 
      lastName,
      password // In production this should be hashed
    });

    // In development mode, we'll just return the user object directly
    // In production, this would include a JWT token
    res.status(201).json({ 
      success: true, 
      data: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      } 
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      res.status(400).json({ success: false, error: 'Please provide username and password' });
      return;
    }
    
    // Find the user by username
    const user = await User.findOne({ username });
    
    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }
    
    // Check password (in development mode, comparing directly)
    // In production, this would use a secure password verification
    if (user.password !== password) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }
    
    // Return user data
    res.status(200).json({ 
      success: true, 
      data: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get current logged in user (for development purposes)
export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // Since we don't have proper authentication with session/token in development mode,
    // this endpoint would accept a userId in the request body
    const { userId } = req.body;
    
    if (!userId) {
      res.status(400).json({ success: false, error: 'User ID is required' });
      return;
    }
    
    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    
    res.status(200).json({ 
      success: true, 
      data: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};
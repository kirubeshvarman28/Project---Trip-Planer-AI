import type { Request, Response } from 'express';
import User from '../models/User.js';

// Dummy implementation for simple testing/development
// In production, you would verify the Google access token here using google-auth-library
export const loginWithGoogle = async (req: Request, res: Response) => {
  try {
    const { token, profile } = req.body;
    
    if (!profile || !profile.email) {
      return res.status(400).json({ message: 'Invalid profile data' });
    }

    // Find or create user based on email/googleId
    let user = await User.findOne({ email: profile.email });
    
    if (!user) {
      user = await User.create({
        googleId: profile.sub || profile.id || `google_${Date.now()}`,
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
      });
    }

    // Usually you'd issue a JWT here
    // For simplicity of this demo, we can just return the user doc
    res.status(200).json({ user, token: 'dummy_jwt_token_for_dev' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const getMe = async (req: Request, res: Response) => {
  try {
    // In a real app, extract user ID from JWT auth middleware req.user
    const userId = req.query.userId || req.headers['x-user-id'];
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

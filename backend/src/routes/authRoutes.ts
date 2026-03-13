import express from 'express';
import { loginWithGoogle, getMe } from '../controllers/authController.js';

const router = express.Router();

// Google OAuth Login callback
router.post('/google', loginWithGoogle);

// Get current user profile
router.get('/me', getMe);

export default router;

import express from 'express';
import { generateTrip, getTrip, getTrips, updateTrip } from '../controllers/tripController.js';

const router = express.Router();

// Get all trips for the authenticated user
router.get('/', getTrips);

// Get a specific trip by ID
router.get('/:id', getTrip);

// Generate a new trip using AI
router.post('/generate', generateTrip);

// Update a trip (itinerary, title, etc)
router.put('/:id', updateTrip);

export default router;

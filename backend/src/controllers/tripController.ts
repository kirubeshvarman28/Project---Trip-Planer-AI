import type { Request, Response } from 'express';
import Trip from '../models/Trip.js';
import { requestTripItinerary } from '../services/openaiService.js';
import mongoose from 'mongoose';

export const getTrips = async (req: Request, res: Response) => {
  try {
    const userId = req.headers['x-user-id'] as string; // in real app, get from token

    if (!userId) {
      return res.status(401).json({ message: 'User ID missing' });
    }

    // Find trips where user is owner or collaborator
    const trips = await Trip.find({
      $or: [{ owner: userId }, { collaborators: userId }]
    }).populate('owner collaborators', 'name email picture');

    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getTrip = async (req: Request, res: Response) => {
  try {
    const tripId = req.params.id;
    const trip = await Trip.findById(tripId).populate('owner collaborators', 'name email picture');

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const generateTrip = async (req: Request, res: Response) => {
  try {
    const { destination, budget, duration, interests, title, startDate } = req.body;
    const ownerId = req.headers['x-user-id'] as string;

    if (!ownerId) {
      return res.status(401).json({ message: 'Unauthorized: User ID missing' });
    }

    // Generate itinerary via OpenAI
    const aiResponse = await requestTripItinerary(destination, budget, duration, interests);

    // Calculate generic end date
    const start = new Date(startDate);
    const endDate = new Date(start);
    endDate.setDate(endDate.getDate() + duration - 1);

    // Map AI dates to itinerary schema
    let generatedItinerary = [];
    if (aiResponse.itinerary && Array.isArray(aiResponse.itinerary)) {
      generatedItinerary = aiResponse.itinerary.map((day: any, i: number) => {
        const dayDate = new Date(start);
        dayDate.setDate(dayDate.getDate() + i);
        return {
          dayNumber: day.dayNumber,
          date: dayDate,
          locations: day.locations
        };
      });
    }

    // Save to Mongo
    const newTrip = new Trip({
      title: title || `${destination} Trip`,
      destination,
      startDate: start,
      endDate: endDate,
      budget,
      interests,
      totalCostEstimate: aiResponse.totalCostEstimate || 0,
      itinerary: generatedItinerary,
      owner: new mongoose.Types.ObjectId(ownerId),
      collaborators: []
    });

    const savedTrip = await newTrip.save();
    
    // Explicitly populate after save
    await savedTrip.populate('owner collaborators', 'name email picture');

    res.status(201).json(savedTrip);
  } catch (error) {
    console.error('Generative Route Error:', error);
    res.status(500).json({ message: 'Failed to generate trip', error: String(error) });
  }
};

export const updateTrip = async (req: Request, res: Response) => {
  try {
    const tripId = req.params.id;
    const updateData = req.body;
    
    // E.g. { itinerary: [...] }

    const updatedTrip = await Trip.findByIdAndUpdate(
      tripId, 
      { $set: updateData }, 
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating trip' });
  }
};

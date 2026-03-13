import mongoose, { Schema, Document } from 'mongoose';

export interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number]; // [lng, lat]
  costEstimate: number;
}

export interface DayItinerary {
  dayNumber: number;
  date: Date;
  locations: Location[];
}

export interface ITrip extends Document {
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: string;
  interests: string[];
  totalCostEstimate: number;
  itinerary: DayItinerary[];
  collaborators: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
  createdAt: Date;
}

const TripSchema: Schema = new Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: String, enum: ['low', 'medium', 'high'], required: true },
  interests: [{ type: String }],
  totalCostEstimate: { type: Number, default: 0 },
  itinerary: [{
    dayNumber: { type: Number, required: true },
    date: { type: Date },
    locations: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      },
      costEstimate: { type: Number, default: 0 }
    }]
  }],
  collaborators: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITrip>('Trip', TripSchema);

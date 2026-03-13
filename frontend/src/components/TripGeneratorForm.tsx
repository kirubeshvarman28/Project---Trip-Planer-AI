'use client';

import { useState } from 'react';
import FloatingCard from './ui/FloatingCard';
import GlassButton from './ui/GlassButton';
import { MapPin, DollarSign, Calendar, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TripGeneratorForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    budget: 'medium',
    duration: 3,
    interests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const savedUser = localStorage.getItem('mockUser');
      const userId = savedUser ? JSON.parse(savedUser).id : 'anonymous';

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/trips/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate trip');
      }

      const data = await response.json();
      router.push(`/trip/${data._id}`);
    } catch (error) {
      console.error('Error generating trip:', error);
      alert('Failed to generate trip. Please make sure the backend is running and you have an OpenAI key set.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FloatingCard duration={6} delay={0.2} className="max-w-xl mx-auto w-full mt-10 p-8 glass-card border border-white/20 shadow-2xl bg-slate-900/40 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">Where to next?</h2>
        <p className="text-white/60">Let AI craft your perfect itinerary</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80 flex items-center gap-2">
            <MapPin size={16} className="text-blue-400" />
            Destination
          </label>
          <input
            required
            type="text"
            placeholder="e.g., Tokyo, Japan"
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-white placeholder:text-white/30"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
              <Calendar size={16} className="text-purple-400" />
              Duration (Days)
            </label>
            <input
              required
              type="number"
              min="1"
              max="30"
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all text-white"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80 flex items-center gap-2">
              <DollarSign size={16} className="text-green-400" />
              Budget
            </label>
            <select
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all text-white appearance-none"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            >
              <option value="low">Budget-friendly</option>
              <option value="medium">Moderate</option>
              <option value="high">Luxury</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80 flex items-center gap-2">
            <Sparkles size={16} className="text-yellow-400" />
            Interests (Optional)
          </label>
          <input
            type="text"
            placeholder="Food, History, Adventure..."
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all text-white placeholder:text-white/30"
            value={formData.interests}
            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
          />
        </div>

        <GlassButton 
          type="submit" 
          disabled={loading}
          className="w-full mt-8 flex items-center justify-center gap-2 py-4"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Generate Magic Itinerary
              <Sparkles size={18} />
            </>
          )}
        </GlassButton>
      </form>
    </FloatingCard>
  );
}

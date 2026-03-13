'use client';

import { useEffect, useState } from 'react';
import TripWorkspace from '@/components/TripWorkspace';
import { use } from 'react';

export default function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [tripData, setTripData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/trips/${id}`);
        if (!response.ok) {
          throw new Error('Trip not found');
        }
        const data = await response.json();
        setTripData(data);
      } catch (err) {
        console.error('Error fetching trip:', err);
        setError('Could not load trip details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !tripData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-400">Oops!</h2>
        <p className="text-white/60 mb-6">{error || 'Something went wrong.'}</p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full transition-colors"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex-1">
      <TripWorkspace tripId={id} initialData={tripData} />
    </div>
  );
}

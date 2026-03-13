'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import MapView from './MapView';
import FloatingCard from './ui/FloatingCard';
import { Share2, Users, DollarSign, GripVertical } from 'lucide-react';
import { format } from 'date-fns';

interface Location {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number];
  costEstimate: number;
}

interface DayItinerary {
  dayNumber: number;
  date: Date;
  locations: Location[];
}

interface TripWorkspaceProps {
  tripId: string;
  initialData: any;
}

export default function TripWorkspace({ tripId, initialData }: TripWorkspaceProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [itinerary, setItinerary] = useState<DayItinerary[]>(initialData.itinerary || []);
  const [collaborators, setCollaborators] = useState(1);

  // Initialize Socket.io connection
  useEffect(() => {
    // Connect to backend server (fallback to localhost for dev)
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000');
    
    socketInstance.on('connect', () => {
      console.log('Connected to socket server');
      socketInstance.emit('join-trip', tripId);
      setCollaborators(c => c + 1);
    });

    socketInstance.on('itinerary-updated', (newItinerary: DayItinerary[]) => {
      console.log('Received itinerary update via socket', newItinerary);
      setItinerary(newItinerary);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [tripId]);

  // Handle reordering / emitting updates
  const handleLocationUpdate = (dayIndex: number, locationIndex: number, updatedLocation: Location) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].locations[locationIndex] = updatedLocation;
    
    setItinerary(newItinerary);
    
    if (socket) {
      socket.emit('update-itinerary', { tripId, itinerary: newItinerary });
    }
  };

  // Extract all locations for map
  const allLocations = itinerary.flatMap((day) => 
    day.locations.map(loc => ({
      ...loc,
      dayNumber: day.dayNumber
    }))
  );

  const totalBudget = itinerary.reduce((acc, day) => {
    return acc + day.locations.reduce((dayAcc, loc) => dayAcc + (loc.costEstimate || 0), 0);
  }, 0);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full gap-6 max-w-[1600px] mx-auto">
      
      {/* Top Action Bar */}
      <div className="flex justify-between items-center bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            {initialData.title || 'Magical Trip Itinerary'}
          </h1>
          <p className="text-white/60 text-sm">
            {format(new Date(initialData.startDate || new Date()), 'MMM dd, yyyy')} • {initialData.duration || itinerary.length} Days
          </p>
        </div>

        <div className="flex items-center gap-4">
          
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-green-400 font-medium">
            <DollarSign size={18} />
            ${totalBudget} Est.
          </div>
          
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl text-blue-300">
            <Users size={18} />
            {collaborators} Active
          </div>
          
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-blue-600/20 text-sm">
            <Share2 size={16} />
            Share Link
          </button>
        </div>
      </div>

      {/* Main Workspace Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-0">
        
        {/* Left Itinerary Column */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2 pb-10 scrollbar-thin">
          {itinerary.map((day, dIdx) => (
            <FloatingCard key={day.dayNumber} duration={4 + (dIdx % 3)} delay={dIdx * 0.2} className="glass border-white/10 p-5 rounded-2xl shadow-xl hover:border-white/20 transition-all group relative">
               
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full pointer-events-none" />
              
              <h3 className="text-xl font-bold text-white/90 mb-4 flex items-center justify-between">
                <span>Day {day.dayNumber}</span>
                <span className="text-sm font-normal text-white/50">{format(new Date(day.date || new Date()), 'MMM dd')}</span>
              </h3>

              <div className="space-y-4 relative z-10">
                {day.locations.map((loc, lIdx) => (
                  <div key={loc.id} className="relative pl-6 pb-4 border-l-2 border-slate-700/50 last:border-l-0 last:pb-0 group/item">
                    
                    {/* Timeline dot */}
                    <div className="absolute top-0 -left-[9px] w-4 h-4 rounded-full border-2 border-slate-800 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                    
                    <div className="bg-slate-800/60 p-4 rounded-xl border border-white/5 hover:bg-slate-700/60 transition-colors flex gap-3">
                      <div className="mt-1 cursor-grab text-white/30 hover:text-white/80 active:cursor-grabbing">
                        <GripVertical size={16} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-blue-100">{loc.name}</h4>
                          <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded-sm">${loc.costEstimate}</span>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">{loc.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FloatingCard>
          ))}

          {itinerary.length === 0 && (
            <div className="h-full flex items-center justify-center text-white/40 border-2 border-dashed border-white/10 rounded-2xl p-10">
              Generating your magical adventure...
            </div>
          )}
        </div>

        {/* Right Map Column */}
        <div className="lg:col-span-7 h-full relative rounded-2xl overflow-hidden glass shadow-2xl">
          <MapView locations={allLocations} />
        </div>

      </div>
    </div>
  );
}

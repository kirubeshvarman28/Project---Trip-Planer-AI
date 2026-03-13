'use client';

import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix for default marker icons in Leaflet when used with Next.js/Webpack
const DefaultIcon = L.divIcon({
  className: 'custom-icon',
  html: renderToStaticMarkup(
    <div className="relative animate-bounce">
      <div className="absolute -inset-2 bg-blue-500 rounded-full opacity-30 blur-md"></div>
      <MapPin className="relative text-blue-400 fill-slate-900" size={32} />
    </div>
  ),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

interface MapViewProps {
  locations?: {
    id: string;
    name: string;
    coordinates: [number, number]; // [lng, lat] from backend
    description: string;
    dayNumber: number;
  }[];
}

// Component to handle map center updates when locations change
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 12);
  return null;
}

export default function MapView({ locations = [] }: MapViewProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-slate-900 animate-pulse rounded-2xl" />;

  const defaultCenter: [number, number] = locations.length > 0 
    ? [locations[0].coordinates[1], locations[0].coordinates[0]] // [lat, lng]
    : [37.8, -122.4];

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden glass border-white/10 shadow-2xl z-0">
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={false}
      >
        {/* Dark Theme Tiles from CartoDB (Voyager) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <ChangeView center={defaultCenter} />

        {locations.map((loc, index) => (
          <Marker
            key={`marker-${loc.id}-${index}`}
            position={[loc.coordinates[1], loc.coordinates[0]]} // [lat, lng]
            icon={L.divIcon({
              className: 'custom-icon',
              html: renderToStaticMarkup(
                <div className="relative group cursor-pointer animate-bounce transition-all">
                  <div className="absolute -inset-2 bg-blue-500 rounded-full opacity-30 group-hover:opacity-100 blur-md transition-all"></div>
                  <MapPin className="relative text-blue-400 fill-slate-900 group-hover:text-blue-300 group-hover:scale-110 transition-transform" size={32} />
                  <div className="absolute top-1 left-[10px] text-xs font-bold text-slate-900 pointer-events-none">
                    {loc.dayNumber}
                  </div>
                </div>
              ),
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })}
          >
            <Popup className="leaflet-popup-custom">
              <div className="p-2 min-w-[200px] text-slate-100 dark">
                <h3 className="font-bold text-lg mb-1 leading-tight">{loc.name}</h3>
                <p className="text-sm text-slate-400 mb-2">{loc.description}</p>
                <div className="inline-block px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md">
                  Day {loc.dayNumber}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom Styles to make Leaflet match the Anti-Gravity aesthetic */}
      <style jsx global>{`
        .leaflet-container {
          background: #0f172a !important;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(15, 23, 42, 0.8) !important;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px !important;
          color: white !important;
        }
        .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.8) !important;
        }
        .leaflet-container a {
          color: #60a5fa !important;
        }
      `}</style>
    </div>
  );
}

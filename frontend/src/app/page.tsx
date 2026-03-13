import TripGeneratorForm from '@/components/TripGeneratorForm';
import FloatingCard from '@/components/ui/FloatingCard';

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="text-center max-w-3xl mb-12">
        <FloatingCard duration={5} className="inline-block px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 font-medium text-sm mb-6">
          ✨ Powered by OpenAI
        </FloatingCard>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Plan trips that defy <span className="text-gradient">Gravity</span>.
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 leading-relaxed">
          The ultimate intelligent travel assistant. Generate personalized itineraries in seconds, collaborate in real-time, and explore an interactive map with floating fluid design.
        </p>
      </div>

      <TripGeneratorForm />
    </div>
  );
}

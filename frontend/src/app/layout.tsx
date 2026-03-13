import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ParticleBackground from '@/components/ui/ParticleBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Trip Planner | Anti-Gravity UI',
  description: 'Plan your next adventure with our AI-powered travel assistant.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen relative`}>
        <ParticleBackground />
        
        {/* Anti-Gravity Navigation */}
        <nav className="fixed top-0 w-full z-50 p-6">
          <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-4 flex justify-between items-center backdrop-blur-md">
            <h1 className="text-2xl font-bold text-gradient tracking-tighter">
              Voyage<span>AI</span>
            </h1>
            <div className="flex gap-4">
              <button className="text-white/70 hover:text-white transition-colors">Trips</button>
              <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors text-sm">
                Sign In
              </button>
            </div>
          </div>
        </nav>

        <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

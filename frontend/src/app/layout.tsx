'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Check if user is already "logged in" locally
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleMockLogin = () => {
    setIsLoggingIn(true);
    // Simulate API delay
    setTimeout(() => {
      const mockUser = {
        id: 'user_local_123',
        name: 'Local Explorer'
      };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsLoggingIn(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem('mockUser');
    setUser(null);
  };

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
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-white/70 text-sm">Hello, {user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleMockLogin}
                  disabled={isLoggingIn}
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors text-sm disabled:opacity-50"
                >
                  {isLoggingIn ? 'Logging in...' : 'Sign In'}
                </button>
              )}
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

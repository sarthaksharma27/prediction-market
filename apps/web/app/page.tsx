"use client";

import React, { useState } from 'react';
import { Header } from '../components/layout/Header';
import { MarketCarousel } from '../components/market/MarketCarousel';
import { Sidebar } from '../components/sidebar/Sidebar';
import { AuthModal } from '../components/AuthModal';

export default function PolymarketHome() {
  // The page ONLY manages global page-level state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#111216] text-zinc-300 font-sans selection:bg-blue-500/30">
      
      {/* 1. Navigation */}
      <Header onOpenAuth={() => setIsAuthModalOpen(true)} />

      {/* 2. Main Layout Grid */}
      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
        
        {/* Left Column: 8 spans */}
        <div className="xl:col-span-8 bg-[#181A20] border border-zinc-800 rounded-xl overflow-hidden relative group min-h-[400px]">
          <MarketCarousel />
        </div>

        {/* Right Column: 4 spans */}
        <div className="xl:col-span-4 flex flex-col gap-8 h-full">
          <Sidebar />
        </div>

      </main>

      {/* 3. Global Overlays */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      {/* Global utility styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
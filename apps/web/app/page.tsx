"use client";

import React, { useEffect, useState } from "react";
import { Header } from "../components/layout/Header";
import { MarketCarousel } from "../components/market/MarketCarousel";
import { Sidebar } from "../components/sidebar/Sidebar";
import { AuthModal } from "../components/AuthModal";
import { supabase } from "@/lib/supabase";

export default function PolymarketHome() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#111216] text-zinc-300 font-sans selection:bg-blue-500/30">

      <Header
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">

        <div className="xl:col-span-8 bg-[#181A20] border border-zinc-800 rounded-xl overflow-hidden relative group min-h-[400px]">
          <MarketCarousel />
        </div>

        <div className="xl:col-span-4 flex flex-col gap-8 h-full">
          <Sidebar />
        </div>

      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `,
        }}
      />
    </div>
  );
}
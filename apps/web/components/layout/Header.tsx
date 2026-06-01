"use client";

import React from "react";
import { Search, Info, Menu, ChevronRight } from "lucide-react";
import { NAV_CATEGORIES } from "../../lib/constants";

interface HeaderProps {
  onOpenAuth: () => void;
  onLogout: () => void;
  user: any;
}

export function Header({
  onOpenAuth,
  onLogout,
  user,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#111216] border-b border-zinc-800">
      <div className="flex items-center justify-between px-6 py-4 flex-wrap gap-4">
        <div className="flex items-center gap-8 flex-1">
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <div className="w-6 h-6 border-2 border-white rounded-sm flex items-center justify-center transform rotate-45">
              <div className="w-2 h-2 bg-white rounded-sm"></div>
            </div>
            Polymarket
          </div>

          <div className="relative max-w-md w-full hidden md:block">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search polymarkets..."
              className="w-full bg-[#1C1E23] border border-zinc-800 text-sm rounded-lg pl-10 pr-10 py-2.5 outline-none focus:border-zinc-600 transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 text-xs font-mono">
              /
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 flex-wrap gap-y-2">
          <button className="flex items-center gap-2 text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">
            <Info size={16} />
            How it works
          </button>

          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={onLogout}
                className="bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={onOpenAuth}
                  className="text-white text-sm font-semibold hover:text-zinc-300 transition-colors px-4"
                >
                  Log In
                </button>

                <button
                  onClick={onOpenAuth}
                  className="bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <button className="text-zinc-400 hover:text-white transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 px-6 py-3 overflow-x-auto no-scrollbar border-t border-zinc-800/50 text-sm font-medium">
        {NAV_CATEGORIES.map((cat, i) => (
          <button
            key={i}
            className={`flex items-center gap-2 whitespace-nowrap transition-colors ${
              cat.active
                ? "text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}

        <button className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 ml-auto">
          More <ChevronRight size={14} className="rotate-90" />
        </button>
      </div>
    </header>
  );
}
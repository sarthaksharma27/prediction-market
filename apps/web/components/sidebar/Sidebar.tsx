import React from 'react';
import { ChevronRight, Flame } from 'lucide-react';
import { BREAKING_NEWS, HOT_TOPICS } from '../../lib/constants';

export function Sidebar() {
  return (
    <>
      <div>
        <div className="flex items-center gap-1 mb-4 group cursor-pointer w-fit">
          <h2 className="text-white font-bold text-lg group-hover:text-zinc-300 transition-colors">Breaking news</h2>
          <ChevronRight size={18} className="text-zinc-500 group-hover:text-zinc-400 transition-colors" />
        </div>
        
        <div className="flex flex-col gap-5">
          {BREAKING_NEWS.map((news) => (
            <div key={news.id} className="flex gap-4 group cursor-pointer">
              <span className="text-zinc-600 font-mono text-sm">{news.id}</span>
              <p className="text-zinc-300 text-sm font-medium leading-snug flex-1 group-hover:text-white transition-colors line-clamp-3">
                {news.title}
              </p>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-white font-bold">{news.prob}</span>
                <span className={`text-xs font-semibold flex items-center ${news.up ? 'text-green-500' : 'text-red-500'}`}>
                  {news.up ? '↗' : '↘'} {news.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-px bg-zinc-800/50 w-full" />

      <div>
        <div className="flex items-center gap-1 mb-4 group cursor-pointer w-fit">
          <h2 className="text-white font-bold text-lg group-hover:text-zinc-300 transition-colors">Hot topics</h2>
          <ChevronRight size={18} className="text-zinc-500 group-hover:text-zinc-400 transition-colors" />
        </div>
        
        <div className="flex flex-col gap-4">
          {HOT_TOPICS.map((topic) => (
            <div key={topic.id} className="flex items-center justify-between group cursor-pointer flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <span className="text-zinc-600 font-mono text-sm">{topic.id}</span>
                <span className="text-zinc-300 font-bold group-hover:text-white transition-colors">
                  {topic.title}
                </span>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <span className="text-zinc-500 text-xs font-medium">{topic.vol} today</span>
                <Flame size={14} className="text-red-500" fill="currentColor" />
                <ChevronRight size={14} className="text-zinc-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
import React from 'react';
import { Info } from 'lucide-react';
import { MarketCardMatch as MarketCardMatchType } from '../../types';

interface Props {
  data: MarketCardMatchType;
}

export function MarketCardMatch({ data }: Props) {
  const psg = data.teams[0];
  const arsenal = data.teams[1];
  
  return (
    <div className="flex-1 flex flex-col md:flex-row h-full">
      <div className="p-6 md:w-[45%] border-b md:border-b-0 md:border-r border-zinc-800/50 flex flex-col">
        <div className="text-xs text-zinc-500 font-medium mb-3 flex items-center gap-2">
          <span>{data.category.level1}</span> <span className="text-zinc-700">•</span>
          <span>{data.category.level2}</span> <span className="text-zinc-700">•</span>
          <span>{data.category.level3}</span>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-6 leading-tight flex-1">
          {data.title}
        </h1>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {data.bettingOptions.map(opt => (
            <button key={opt.name} className={`${opt.actionColorClass} border font-semibold py-3 rounded-lg flex flex-col items-center justify-center transition-all`}>
              <span>{opt.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#181A20] z-10 pointer-events-none top-2/3" />
          <div className="flex flex-col gap-4 text-sm opacity-80">
            {data.comments.map((comment, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex-shrink-0 ${comment.avatar}`} />
                <div className="leading-tight">
                  <p className="font-semibold text-zinc-400">{comment.user}</p>
                  <p className="text-zinc-500">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between text-sm text-blue-400 font-medium">
          <span>{data.volume}</span>
        </div>
      </div>

      <div className="p-6 md:w-[55%] relative flex flex-col h-full">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-blue-900 flex items-center justify-center border-2 border-blue-500">
               <span className="font-bold text-white text-xs">{psg.avatarText}</span>
            </div>
            <span className="text-sm font-medium text-zinc-400 text-center w-24 leading-tight">{psg.name}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-4xl font-mono font-bold text-white tracking-widest flex items-center gap-4">
              <span>{psg.score}</span>
              <span className="text-zinc-600">-</span>
              <span>{arsenal.score}</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-red-500 text-xs font-bold bg-red-500/10 px-2 py-0.5 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {data.ends} <Info size={12} className="text-zinc-500 ml-1" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center border-2 border-red-400">
               <span className="font-bold text-white text-[10px]">{arsenal.avatarText}</span>
            </div>
            <span className="text-sm font-medium text-zinc-400 text-center w-24 leading-tight">{arsenal.name}</span>
          </div>
        </div>

        <div className="flex-1 relative mt-4 min-h-[250px]">
           <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-zinc-600 pb-8">
             {['100%', '75%', '50%', '25%', '0%'].map(v => (
              <div key={v} className="flex items-center w-full border-b border-zinc-800/30 border-dashed h-0"><span className="ml-auto bg-[#181A20] pl-2 -translate-y-1/2">{v}</span></div>
             ))}
           </div>

           <svg className="absolute inset-0 w-full h-[calc(100%-2rem)]" preserveAspectRatio="none" viewBox="0 0 100 100">
             <path d="M 0 70 L 60 70 L 65 98 L 70 80 L 72 99.9" fill="none" stroke={psg.color} strokeWidth="0.5" />
             <path d="M 0 80 L 60 80 L 65 75 L 70 80 L 72 0" fill="none" stroke="#9ca3af" strokeWidth="0.5" />
             <path d="M 0 78 L 60 78 L 65 50 L 70 55 L 72 99.8" fill="none" stroke={arsenal.color} strokeWidth="0.5" />
           </svg>

           <div className="absolute right-12 bottom-12 flex flex-col gap-4 text-right">
             <div>
               <p className="text-zinc-500 text-xs mb-1">Draw</p>
               <p className="text-white text-3xl font-light">{data.currentOdds.draw}</p>
             </div>
             <div>
               <p className="text-blue-500 text-xs mb-1">{psg.name}</p>
               <p className="text-blue-500 text-xl font-light">{data.currentOdds.paris}</p>
             </div>
             <div>
               <p className="text-red-500 text-xs mb-1">{arsenal.name}</p>
               <p className="text-red-500 text-xl font-light">{data.currentOdds.arsenal}</p>
             </div>
           </div>
        </div>
        
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-zinc-600 text-sm font-semibold z-30">
          <div className="w-4 h-4 border-2 border-zinc-600 rounded-sm flex items-center justify-center transform rotate-45">
            <div className="w-1.5 h-1.5 bg-zinc-600 rounded-sm"></div>
          </div>
          Polymarket
        </div>
      </div>
    </div>
  );
}
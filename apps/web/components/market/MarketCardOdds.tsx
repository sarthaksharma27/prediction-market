import React, { Fragment } from 'react';
import { Ticket, MapPin, Zap } from 'lucide-react';
import { MarketCardOdds as MarketCardOddsType } from '../../types';

interface Props {
  data: MarketCardOddsType;
}

export function MarketCardOdds({ data }: Props) {
  return (
    <div className="flex-1 flex flex-col h-full p-6 md:p-8 relative">
       <div className="absolute bottom-4 right-4 flex items-center gap-2 text-zinc-600 text-sm font-semibold z-30">
          <div className="w-4 h-4 border-2 border-zinc-600 rounded-sm flex items-center justify-center transform rotate-45">
            <div className="w-1.5 h-1.5 bg-zinc-600 rounded-sm"></div>
          </div>
          Polymarket
        </div>
        <div className="absolute bottom-4 left-6 flex items-center gap-1.5 text-zinc-700 font-mono text-xs z-30">
          <span>May 3</span>
          <span className="opacity-60">May 10</span>
          <span className="opacity-60">May 17</span>
          <span className="opacity-60">May 24</span>
          <span className="font-bold text-zinc-500">Ends {data.ends}</span>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 text-sm text-blue-400 font-medium z-30">
          <span>{data.volume}</span>
        </div>

      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-1">
          {data.logo}
          <div>
            <div className="text-xs text-zinc-500 font-medium mb-1.5 flex items-center gap-2">
                <span>{data.category.level1}</span> <span className="text-zinc-700">•</span>
                <span>{data.category.level2}</span>
            </div>
            <h1 className="text-2xl font-bold text-white leading-tight">
                {data.title}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-zinc-600 hover:text-white"><Ticket size={20}/></button>
          <button className="text-zinc-600 hover:text-white"><MapPin size={20}/></button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 flex-wrap">
          <div className="w-full md:w-1/3 flex flex-col gap-6 font-medium">
             {data.teams.map(team => (
                <div key={team.name} className="flex flex-col gap-1.5">
                    <span className="text-zinc-400 text-sm line-clamp-1">{team.name}</span>
                    <span className="text-white text-5xl font-mono leading-none">{team.odds}</span>
                </div>
             ))}
          </div>

          <div className="flex-1 flex flex-col relative h-[300px]">
             <div className="absolute top-0 left-0 z-20 flex items-center gap-2 text-xs font-mono font-medium flex-wrap">
                 {data.teams.map((team, index) => {
                     const bgColor = index === 0 ? 'bg-blue-900 border-blue-500/50' : 'bg-orange-950 border-orange-500/50';
                     const textColor = index === 0 ? 'text-blue-400' : 'text-orange-400';
                     return (
                        <div key={team.name} className={`flex items-center gap-1.5 ${bgColor} border px-2 py-0.5 rounded-sm`}>
                            <Zap size={10} className={textColor} /> {team.name} <span className="text-white">{team.odds}</span>
                        </div>
                     );
                 })}
             </div>

             <div className="flex-1 relative mt-12 pb-8 border border-zinc-800 border-dashed rounded-lg flex flex-col">
                 <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    {data.graphData.series.map((series, index) => {
                      const color = index === 0 ? '#3b82f6' : '#f59e0b';
                      const pathData = series.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                      return (
                        <Fragment key={series.name}>
                          <path d={pathData} fill="none" stroke={color} strokeWidth="0.8" />
                          <circle cx="100" cy={series.points[series.points.length - 1].y} r="1.5" fill={color} />
                        </Fragment>
                      )
                    })}
                 </svg>

                 <div className="absolute inset-0 z-20 pointer-events-none font-mono text-[11px] text-zinc-500 font-bold">
                     {data.graphData.volumeMarkers.map((marker, i) => (
                        <div key={i} className="absolute p-1 bg-black/60 rounded-sm" style={{left: `${marker.x}%`, top: `${marker.y}%`, transform: 'translate(-50%, -50%)'}}>{marker.text}</div>
                     ))}
                 </div>

                 <div className="absolute top-2 bottom-8 right-2 flex flex-col justify-between font-mono text-[10px] text-zinc-600 text-right z-30 pointer-events-none">
                     {['80%', '65%', '50%', '35%', '20%'].map(v => (
                        <span key={v} className="bg-[#181A20] pl-1">{v}</span>
                     ))}
                 </div>
             </div>
          </div>
      </div>
    </div>
  );
}
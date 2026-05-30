"use client";

import React, { useState, useEffect, Fragment } from 'react';
import { Search, Info, Menu, TrendingUp, ChevronRight, Flame, MapPin, Ticket, Zap } from 'lucide-react';
import { AuthModal } from '../components/AuthModal';

// --- DATA STRUCTURES & MOCK DATA ---

const NAV_CATEGORIES = [
  { name: 'Trending', icon: <TrendingUp size={16} />, active: true },
  { name: 'Breaking' }, { name: 'New' }, { name: 'Politics' }, { name: 'Sports' },
  { name: 'Crypto' }, { name: 'Esports' }, { name: 'Iran' }, { name: 'Finance' },
  { name: 'Geopolitics' }, { name: 'Tech' }, { name: 'Culture' }, { name: 'Economy' },
  { name: 'Weather' }, { name: 'Mentions' }, { name: 'Elections' }
];

const COMMENTS = [
  { user: 'DonalBCrypto', text: 'Psg 0-1 Arsenal', avatar: 'bg-zinc-600' },
  { user: 'PLEASEDONTFAILYOURSE...', text: 'Xd', avatar: 'bg-zinc-800' },
  { user: 'DonalBCrypto', text: 'Haha', avatar: 'bg-yellow-600' },
  { user: 'ogkgm05', text: 'HALA MADRID', avatar: 'bg-purple-600' },
  { user: 'Aldax4', text: "Let's go psg", avatar: 'bg-zinc-700' },
];

const BREAKING_NEWS = [
  { id: 1, title: 'US x Cuba diplomatic meeting by May 31?', prob: '74%', change: '65%', up: true },
  { id: 2, title: 'Will Donald Trump announce that the United States blockade of the Strait of...', prob: '11%', change: '43%', up: false },
  { id: 3, title: 'US announces new Iran agreement/ceasefire extension by May...', prob: '12%', change: '30%', up: false },
];

const HOT_TOPICS = [
  { id: 1, title: 'PSG', vol: '$35M' },
  { id: 2, title: 'Arsenal', vol: '$97M' },
  { id: 3, title: 'Liverpool', vol: '$35M' },
  { id: 4, title: 'Champions', vol: '$36M' },
  { id: 5, title: 'UCL', vol: '$49M' },
];

// Contextual Graphic SVGs
const UclLogo = (
  <div className="w-16 h-16 rounded-xl bg-green-950 flex items-center justify-center border border-green-800 p-3 shrink-0">
    <div className="flex flex-col items-center gap-0.5 transform rotate-[-15deg]">
      <span className="text-[6px] text-green-400 leading-none">UEFA</span>
      <div className="w-5 h-5 rounded-full border border-green-400 flex items-center justify-center">
        <span className="text-green-400 text-[10px] font-mono leading-none flex gap-0.5"><MapPin size={4} fill="currentColor" />U</span>
      </div>
      <span className="text-[6px] text-green-400 leading-none">CL</span>
    </div>
  </div>
);

const CryptoLogo = (
  <div className="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center border-2 border-blue-500 shrink-0">
    <span className="font-bold text-white text-xs">CRYPTO</span>
  </div>
);

const PoliticsLogo = (
  <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border-2 border-slate-700 shrink-0">
    <span className="font-bold text-white text-xs">US ELEC</span>
  </div>
);

interface GraphPoint { x: number; y: number }
interface VolumeMarker { x: number; y: number; text: string }

interface MarketCardMatch {
  type: 'match';
  category: { level1: string; level2: string; level3: string };
  title: string;
  teams: { name: string; avatarBg: string; score: string; avatarText: string; color: string }[];
  currentOdds: { draw: string; paris: string; arsenal: string };
  bettingOptions: { name: string; label: string; actionColorClass: string; }[];
  comments: { user: string; text: string; avatar: string }[];
  volume: string;
  ends: string;
}

interface MarketCardOdds {
  type: 'odds';
  title: string;
  category: { level1: string; level2: string; level3: string };
  logo: React.ReactNode;
  teams: { name: string; odds: string; color: string }[];
  graphData: {
    series: { name: string; points: GraphPoint[] }[];
    volumeMarkers: VolumeMarker[];
  };
  volume: string;
  ends: string;
}

type MarketData = MarketCardMatch | MarketCardOdds;

const CAROUSEL_DATA: MarketData[] = [
  {
    type: 'match',
    category: { level1: 'Sports', level2: 'Soccer', level3: 'UCL' },
    title: 'Paris Saint-Germain FC vs. Arsenal',
    teams: [
      { name: 'Paris Saint-Germain FC', avatarBg: 'bg-blue-900', score: '1', avatarText: 'PSG', color: '#3b82f6' },
      { name: 'Arsenal', avatarBg: 'bg-red-600', score: '1', avatarText: 'ARSENAL', color: '#ef4444' },
    ],
    currentOdds: { draw: '100.0%', paris: '0.1%', arsenal: '0.2%' },
    bettingOptions: [
      { name: 'paris', label: 'Paris', actionColorClass: 'text-blue-400 bg-[#121E36] border-blue-900/50 hover:bg-[#1A2C4D]' },
      { name: 'draw', label: 'DRAW', actionColorClass: 'text-zinc-300 bg-[#23262F] border-zinc-700/50 hover:bg-[#2C303A]' },
      { name: 'arsenal', label: 'Arsenal', actionColorClass: 'text-red-400 bg-[#361616] border-red-900/50 hover:bg-[#4A1D1D]' },
    ],
    comments: COMMENTS,
    volume: '$39M Vol',
    ends: 'HT',
  },
  {
    type: 'odds',
    title: 'UEFA Champions League Winner',
    category: { level1: 'Sports', level2: 'Soccer', level3: 'UCL' },
    logo: UclLogo,
    teams: [
      { name: 'PSG', odds: '54%', color: '#3b82f6' },
      { name: 'Arsenal', odds: '48%', color: '#f59e0b' },
    ],
    graphData: {
      series: [
        { name: 'PSG', points: [{x:0, y:70}, {x:50, y:70}, {x:60, y:60}, {x:70, y:65}, {x:100, y:54}] },
        { name: 'Arsenal', points: [{x:0, y:85}, {x:50, y:85}, {x:60, y:88}, {x:70, y:90}, {x:100, y:48}] },
      ],
      volumeMarkers: [
        { x: 45, y: 55, text: '+ $2' },
        { x: 45, y: 75, text: '+ $30' },
        { x: 45, y: 88, text: '+ $3' },
        { x: 45, y: 95, text: '+ $5' },
      ],
    },
    volume: '$277M Vol',
    ends: 'May 31, 2026',
  },
  {
    type: 'odds',
    title: '2026 US Presidential Election Winner',
    category: { level1: 'Politics', level2: 'US Election', level3: 'Presidential' },
    logo: PoliticsLogo,
    teams: [
      { name: 'Incumbent', odds: '55%', color: '#3b82f6' },
      { name: 'Challenger', odds: '45%', color: '#f59e0b' },
    ],
    graphData: {
      series: [
        { name: 'Incumbent', points: [{x:0, y:50}, {x:25, y:60}, {x:50, y:55}, {x:75, y:58}, {x:100, y:55}] },
        { name: 'Challenger', points: [{x:0, y:50}, {x:25, y:40}, {x:50, y:45}, {x:75, y:42}, {x:100, y:45}] },
      ],
      volumeMarkers: [
        { x: 20, y: 20, text: '+ $1' },
        { x: 30, y: 15, text: '+ $20' },
        { x: 80, y: 40, text: '+ $3' },
      ],
    },
    volume: '$100M Vol',
    ends: 'Nov 3, 2026',
  },
  {
    type: 'odds',
    title: 'Crypto Total Market Cap > $3T?',
    category: { level1: 'Crypto', level2: 'Market Cap', level3: 'Major Markets' },
    logo: CryptoLogo,
    teams: [
      { name: 'Yes', odds: '60%', color: '#3b82f6' },
      { name: 'No', odds: '40%', color: '#f59e0b' },
    ],
    graphData: {
      series: [
        { name: 'Yes', points: [{x:0, y:80}, {x:20, y:85}, {x:50, y:55}, {x:60, y:65}, {x:100, y:60}] },
        { name: 'No', points: [{x:0, y:20}, {x:20, y:15}, {x:50, y:45}, {x:60, y:35}, {x:100, y:40}] },
      ],
      volumeMarkers: [
        { x: 20, y: 60, text: '+ $5' },
        { x: 60, y: 45, text: '+ $50' },
        { x: 90, y: 70, text: '+ $10' },
      ],
    },
    volume: '$50M Vol',
    ends: 'Dec 31, 2026',
  },
];

// --- SUPPORTING REUSABLE UI CARDS ---

function MarketCardMatch({ data }: { data: MarketCardMatch }) {
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

function MarketCardOdds({ data }: { data: MarketCardOdds }) {
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

// --- MAIN WRAPPER ENTRYPOINT ---

export default function PolymarketClone() {
  const [activeMarketIndex, setActiveMarketIndex] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMarketIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#111216] text-zinc-300 font-sans selection:bg-blue-500/30">
      
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                placeholder="Search polymarkets..." 
                className="w-full bg-[#1C1E23] border border-zinc-800 text-sm rounded-lg pl-10 pr-10 py-2.5 outline-none focus:border-zinc-600 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 text-xs font-mono">/</span>
            </div>
          </div>

          <div className="flex items-center gap-6 flex-wrap gap-y-2">
            <button className="flex items-center gap-2 text-blue-400 text-sm font-semibold hover:text-blue-300 transition-colors">
              <Info size={16} />
              How it works
            </button>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="text-white text-sm font-semibold hover:text-zinc-300 transition-colors px-4"
              >
                Log In
              </button>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Sign Up
              </button>
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
              className={`flex items-center gap-2 whitespace-nowrap transition-colors ${cat.active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'}`}
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

      <main className="max-w-[1600px] mx-auto p-6 grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
        <div className="xl:col-span-8 bg-[#181A20] border border-zinc-800 rounded-xl overflow-hidden relative group min-h-[400px]">
          {(() => {
            const currentData = CAROUSEL_DATA[activeMarketIndex];
            if (currentData.type === 'match') {
              return <MarketCardMatch data={currentData} />;
            } else {
              return <MarketCardOdds data={currentData} />;
            }
          })()}
        </div>

        <div className="xl:col-span-4 flex flex-col gap-8 h-full">
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
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
import React from 'react';
import { TrendingUp, MapPin } from 'lucide-react';
import { MarketData } from '../types';

export const NAV_CATEGORIES = [
  { name: 'Trending', icon: <TrendingUp size={16} />, active: true },
  { name: 'Breaking' }, { name: 'New' }, { name: 'Politics' }, { name: 'Sports' },
  { name: 'Crypto' }, { name: 'Esports' }, { name: 'Iran' }, { name: 'Finance' },
  { name: 'Geopolitics' }, { name: 'Tech' }, { name: 'Culture' }, { name: 'Economy' },
  { name: 'Weather' }, { name: 'Mentions' }, { name: 'Elections' }
];

export const COMMENTS = [
  { user: 'DonalBCrypto', text: 'Psg 0-1 Arsenal', avatar: 'bg-zinc-600' },
  { user: 'PLEASEDONTFAILYOURSE...', text: 'Xd', avatar: 'bg-zinc-800' },
  { user: 'DonalBCrypto', text: 'Haha', avatar: 'bg-yellow-600' },
  { user: 'ogkgm05', text: 'HALA MADRID', avatar: 'bg-purple-600' },
  { user: 'Aldax4', text: "Let's go psg", avatar: 'bg-zinc-700' },
];

export const BREAKING_NEWS = [
  { id: 1, title: 'US x Cuba diplomatic meeting by May 31?', prob: '74%', change: '65%', up: true },
  { id: 2, title: 'Will Donald Trump announce that the United States blockade of the Strait of...', prob: '11%', change: '43%', up: false },
  { id: 3, title: 'US announces new Iran agreement/ceasefire extension by May...', prob: '12%', change: '30%', up: false },
];

export const HOT_TOPICS = [
  { id: 1, title: 'PSG', vol: '$35M' },
  { id: 2, title: 'Arsenal', vol: '$97M' },
  { id: 3, title: 'Liverpool', vol: '$35M' },
  { id: 4, title: 'Champions', vol: '$36M' },
  { id: 5, title: 'UCL', vol: '$49M' },
];

export const UclLogo = (
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

export const CryptoLogo = (
  <div className="w-16 h-16 rounded-full bg-blue-950 flex items-center justify-center border-2 border-blue-500 shrink-0">
    <span className="font-bold text-white text-xs">CRYPTO</span>
  </div>
);

export const PoliticsLogo = (
  <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border-2 border-slate-700 shrink-0">
    <span className="font-bold text-white text-xs">US ELEC</span>
  </div>
);

export const CAROUSEL_DATA: MarketData[] = [
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
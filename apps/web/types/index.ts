import React from 'react';

export interface GraphPoint { x: number; y: number }
export interface VolumeMarker { x: number; y: number; text: string }

export interface MarketCardMatch {
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

export interface MarketCardOdds {
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

export type MarketData = MarketCardMatch | MarketCardOdds;
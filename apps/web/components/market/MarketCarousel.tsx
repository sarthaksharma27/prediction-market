"use client";

import React, { useState, useEffect } from 'react';
import { CAROUSEL_DATA } from '../../lib/constants';
import { MarketCardMatch } from './MarketCardMatch';
import { MarketCardOdds } from './MarketCardOdds';

export function MarketCarousel() {
  const [activeMarketIndex, setActiveMarketIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMarketIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentData = CAROUSEL_DATA[activeMarketIndex];

  if (currentData.type === 'match') {
    return <MarketCardMatch data={currentData} />;
  }

  return <MarketCardOdds data={currentData} />;
}
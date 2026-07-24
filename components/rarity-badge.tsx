'use client';

import { RARITY_CONFIG } from '@/lib/constants';

export default function RarityBadge({ rarity, size = 'sm' }: { rarity: string; size?: 'xs' | 'sm' | 'md' }) {
  const conf = RARITY_CONFIG[rarity ?? 'COMMON'] ?? RARITY_CONFIG.COMMON;
  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.5',
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-full ${sizeClasses[size]} ${rarity === 'MYTHIC' ? 'animate-gradient bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white' : ''}`}
      style={
        rarity !== 'MYTHIC'
          ? {
              color: conf?.color,
              backgroundColor: `${conf?.color}20`,
              border: `1px solid ${conf?.color}40`,
            }
          : {}
      }
    >
      {rarity === 'MYTHIC' ? '✦ ' : ''}{conf?.label ?? rarity}
    </span>
  );
}

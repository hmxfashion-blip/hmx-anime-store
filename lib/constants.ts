export const RARITY_CONFIG: Record<string, { label: string; color: string; bgColor: string; borderColor: string; glowColor: string; gradient: string }> = {
  COMMON: {
    label: 'Common',
    color: '#9ca3af',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/50',
    glowColor: 'shadow-gray-500/30',
    gradient: 'from-gray-400 to-gray-600',
  },
  UNCOMMON: {
    label: 'Uncommon',
    color: '#22c55e',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/50',
    glowColor: 'shadow-green-500/30',
    gradient: 'from-green-400 to-green-600',
  },
  RARE: {
    label: 'Rare',
    color: '#3b82f6',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/50',
    glowColor: 'shadow-blue-500/30',
    gradient: 'from-blue-400 to-blue-600',
  },
  EPIC: {
    label: 'Epic',
    color: '#a855f7',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/50',
    glowColor: 'shadow-purple-500/30',
    gradient: 'from-purple-400 to-purple-600',
  },
  LEGENDARY: {
    label: 'Legendary',
    color: '#f59e0b',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/50',
    glowColor: 'shadow-amber-500/30',
    gradient: 'from-amber-400 to-orange-600',
  },
  MYTHIC: {
    label: 'Mythic',
    color: '#ef4444',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/50',
    glowColor: 'shadow-red-500/30',
    gradient: 'from-red-500 via-pink-500 to-purple-500',
  },
};

export const CATEGORIES = [
  { name: 'Action Figures', slug: 'action-figures', image: 'https://m.media-amazon.com/images/I/71KLZeaD9RL.jpg' },
  { name: 'Katanas', slug: 'katanas', image: 'https://m.media-amazon.com/images/I/71waHs2zAaL.jpg' },
  { name: 'Cosplay', slug: 'cosplay', image: 'https://www.cosfun.com/cdn/shop/files/Genshin-Impact-Yelan-Cosplay-Costume-Tranquil-Banquet-Outfit-6_1200x.webp?v=1768988195' },
  { name: 'Wall Posters', slug: 'wall-posters', image: 'https://gamingwallartshop.com/cdn/shop/files/10266263833204095830_2048.jpg?v=1781167778' },
  { name: 'LED Lamps', slug: 'led-lamps', image: 'https://neonmfg.com/cdn/shop/products/redhairanime.jpg?v=1671058506&width=1214' },
  { name: 'Anime Hoodies', slug: 'anime-hoodies', image: 'https://yujinclothing.com/cdn/shop/products/hoodie-front-view.jpg?v=1773292495' },
];

export const HERO_BG = 'https://cdn.abacus.ai/images/4a492518-700d-4f80-9202-299fc72cfd99.png';

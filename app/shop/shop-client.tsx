'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Filter, SortAsc, X, Search } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { RARITY_CONFIG } from '@/lib/constants';

interface ShopClientProps {
  initialProducts: any[];
  categories: string[];
  seriesList: string[];
}

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'bestSeller' },
  { label: 'Highest Rated', value: 'rating' },
];

const RARITY_ORDER = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC'];

export default function ShopClient({ initialProducts, categories, seriesList }: ShopClientProps) {
  const searchParams = useSearchParams();
  const [products] = useState(initialProducts ?? []);
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') ?? '');
  const [selectedRarity, setSelectedRarity] = useState(searchParams?.get('rarity') ?? '');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [sortBy, setSortBy] = useState(searchParams?.get('sort') ?? 'newest');
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') ?? '');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const filteredProducts = useMemo(() => {
    let filtered = [...(products ?? [])];

    if (selectedCategory) {
      filtered = filtered.filter((p: any) => p?.category === selectedCategory);
    }
    if (selectedRarity) {
      filtered = filtered.filter((p: any) => p?.rarity === selectedRarity);
    }
    if (selectedSeries) {
      filtered = filtered.filter((p: any) => p?.animeSeries === selectedSeries);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((p: any) =>
        (p?.name ?? '').toLowerCase().includes(q) ||
        (p?.animeSeries ?? '').toLowerCase().includes(q) ||
        (p?.description ?? '').toLowerCase().includes(q)
      );
    }
    filtered = filtered.filter((p: any) => (p?.price ?? 0) >= priceRange[0] && (p?.price ?? 0) <= priceRange[1]);

    // Sort
    if (sortBy === 'price-asc') filtered.sort((a: any, b: any) => (a?.price ?? 0) - (b?.price ?? 0));
    else if (sortBy === 'price-desc') filtered.sort((a: any, b: any) => (b?.price ?? 0) - (a?.price ?? 0));
    else if (sortBy === 'bestSeller') filtered.sort((a: any, b: any) => (b?.reviewCount ?? 0) - (a?.reviewCount ?? 0));
    else if (sortBy === 'rating') filtered.sort((a: any, b: any) => (b?.rating ?? 0) - (a?.rating ?? 0));
    else filtered.sort((a: any, b: any) => new Date(b?.createdAt ?? 0).getTime() - new Date(a?.createdAt ?? 0).getTime());

    return filtered;
  }, [products, selectedCategory, selectedRarity, selectedSeries, sortBy, searchQuery, priceRange]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedRarity('');
    setSelectedSeries('');
    setSearchQuery('');
    setPriceRange([0, 500]);
    setSortBy('newest');
  };

  const hasActiveFilters = selectedCategory || selectedRarity || selectedSeries || searchQuery;

  const formatCategory = (cat: string) => (cat ?? '').split('-').map((w: string) => (w?.[0]?.toUpperCase?.() ?? '') + (w?.slice?.(1) ?? '')).join(' ');

  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2">
            Shop <span className="text-neon-purple">Collection</span>
          </h1>
          <p className="text-white/40 text-sm">Browse our premium anime merchandise</p>
        </motion.div>

        {/* Search & Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-purple/50"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-white/10 text-white/70 hover:text-white text-xs gap-2"
            >
              <Filter className="w-4 h-4" /> Filters {hasActiveFilters ? '•' : ''}
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 focus:outline-none focus:border-neon-purple/50"
            >
              {SORT_OPTIONS.map((opt: { label: string; value: string }) => (
                <option key={opt.value} value={opt.value} className="bg-[#0f0f0f]">{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="glass-card rounded-xl p-4 mb-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold">Filters</h3>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs text-neon-red flex items-center gap-1">
                  <X className="w-3 h-3" /> Clear All
                </button>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="text-xs text-white/40 mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {(categories ?? []).map((cat: string) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      selectedCategory === cat
                        ? 'bg-neon-purple text-white'
                        : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {formatCategory(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Rarity */}
            <div>
              <label className="text-xs text-white/40 mb-2 block">Rarity</label>
              <div className="flex flex-wrap gap-2">
                {RARITY_ORDER.map((r: string) => {
                  const conf = RARITY_CONFIG[r] ?? RARITY_CONFIG.COMMON;
                  return (
                    <button
                      key={r}
                      onClick={() => setSelectedRarity(selectedRarity === r ? '' : r)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        selectedRarity === r ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                      }`}
                      style={{ color: conf?.color, borderColor: `${conf?.color}40`, backgroundColor: selectedRarity === r ? `${conf?.color}20` : 'transparent' }}
                    >
                      {conf?.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Series */}
            <div>
              <label className="text-xs text-white/40 mb-2 block">Anime Series</label>
              <div className="flex flex-wrap gap-2">
                {(seriesList ?? []).map((s: string) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSeries(selectedSeries === s ? '' : s)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      selectedSeries === s
                        ? 'bg-neon-blue text-white'
                        : 'bg-white/5 text-white/50 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <p className="text-xs text-white/30 mb-4">{filteredProducts.length} products found</p>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product: any, i: number) => (
              <motion.div
                key={product?.id ?? i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.4) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/30 text-lg">No products found</p>
            <button onClick={clearFilters} className="text-neon-purple text-sm mt-2 hover:underline">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

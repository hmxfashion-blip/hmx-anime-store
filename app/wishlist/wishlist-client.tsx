'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import ProductCard from '@/components/product-card';
import { toast } from 'sonner';

interface WishlistClientProps {
  items: any[];
}

export default function WishlistClient({ items: initialItems }: WishlistClientProps) {
  const [items, setItems] = useState(initialItems ?? []);

  const handleRemove = async (productId: string) => {
    try {
      await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      setItems((prev: any[]) => (prev ?? []).filter((item: any) => item?.product?.id !== productId));
      toast.success('Removed from wishlist');
    } catch {
      toast.error('Failed to remove');
    }
  };

  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-neon-pink" />
            <h1 className="text-3xl font-display font-bold tracking-tight">My Wishlist</h1>
          </div>
          <p className="text-white/40 text-sm">{(items ?? []).length} items saved</p>
        </motion.div>

        {(items ?? []).length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-white/10 mx-auto mb-4" />
            <p className="text-white/30 text-lg">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(items ?? []).map((item: any, i: number) => (
              <motion.div key={item?.id ?? i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="relative">
                <ProductCard product={item?.product} />
                <button
                  onClick={() => handleRemove(item?.product?.id ?? '')}
                  className="absolute top-2 right-2 z-10 p-2 rounded-full glass text-neon-red hover:bg-neon-red/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

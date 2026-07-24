'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { RARITY_CONFIG } from '@/lib/constants';
import RarityBadge from '@/components/rarity-badge';
import { toast } from 'sonner';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice: number | null;
    image: string;
    rarity: string;
    rating: number;
    reviewCount: number;
    category: string;
    animeSeries: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const conf = RARITY_CONFIG[product?.rarity ?? 'COMMON'] ?? RARITY_CONFIG.COMMON;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product?.id ?? '',
      name: product?.name ?? '',
      price: product?.price ?? 0,
      image: product?.image ?? '',
      rarity: product?.rarity ?? 'COMMON',
      slug: product?.slug ?? '',
    });
    toast.success(`${product?.name ?? 'Item'} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <Link href={`/product/${product?.slug ?? ''}`}>
        <div
          className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:border-opacity-30"
          style={{
            borderColor: `${conf?.color}30`,
            boxShadow: `0 0 0 1px ${conf?.color}10`,
          }}
        >
          {/* Image */}
          <div className="relative aspect-square bg-black/40 overflow-hidden">
            {!imgError ? (
              <Image
                src={product?.image ?? ''}
                alt={product?.name ?? 'Product'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20">
                <ShoppingCart className="w-12 h-12" />
              </div>
            )}

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-2 rounded-lg bg-neon-purple/90 hover:bg-neon-purple text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
                <span
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Rarity Badge */}
            <div className="absolute top-3 left-3">
              <RarityBadge rarity={product?.rarity ?? 'COMMON'} />
            </div>

            {/* Discount */}
            {product?.originalPrice && product.originalPrice > product.price && (
              <div className="absolute top-3 right-3 bg-neon-red/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3">
            <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{product?.animeSeries ?? ''}</p>
            <h3 className="text-sm font-medium text-white line-clamp-1 mb-2">{product?.name ?? 'Product'}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold" style={{ color: conf?.color }}>
                  ${product?.price?.toFixed?.(2) ?? '0.00'}
                </span>
                {product?.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-white/30 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-[10px] text-white/50">{product?.rating?.toFixed?.(1) ?? '0'}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Minus, Plus, ArrowLeft, Shield, Truck, RotateCcw } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { RARITY_CONFIG } from '@/lib/constants';
import RarityBadge from '@/components/rarity-badge';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

interface ProductDetailClientProps {
  product: any;
  relatedProducts: any[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { data: session } = useSession() || {};
  const conf = RARITY_CONFIG[product?.rarity ?? 'COMMON'] ?? RARITY_CONFIG.COMMON;

  const handleAddToCart = () => {
    addItem(
      {
        id: product?.id ?? '',
        name: product?.name ?? '',
        price: product?.price ?? 0,
        image: product?.image ?? '',
        rarity: product?.rarity ?? 'COMMON',
        slug: product?.slug ?? '',
      },
      quantity
    );
    toast.success(`${product?.name ?? 'Item'} added to cart!`);
  };

  const handleWishlist = async () => {
    if (!session?.user) {
      toast.error('Please sign in to add to wishlist');
      return;
    }
    try {
      const res = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product?.id }),
      });
      const data = await res.json().catch(() => ({}));
      setWishlisted(data?.added ?? false);
      toast.success(data?.added ? 'Added to wishlist!' : 'Removed from wishlist');
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Back */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div
              className="relative aspect-square rounded-2xl overflow-hidden glass-card"
              style={{ boxShadow: `0 0 40px ${conf?.color}15` }}
            >
              {!imgError ? (
                <Image
                  src={product?.image ?? ''}
                  alt={product?.name ?? 'Product'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">
                  <ShoppingCart className="w-20 h-20" />
                </div>
              )}
              <div className="absolute top-4 left-4">
                <RarityBadge rarity={product?.rarity ?? 'COMMON'} size="md" />
              </div>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col">
            <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{product?.animeSeries ?? ''}</p>
            <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-4">{product?.name ?? 'Product'}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i: number) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product?.rating ?? 0) ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} />
                ))}
              </div>
              <span className="text-sm text-white/50">{product?.rating?.toFixed?.(1) ?? '0'} ({product?.reviewCount ?? 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold" style={{ color: conf?.color }}>
                ${product?.price?.toFixed?.(2) ?? '0.00'}
              </span>
              {product?.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-white/30 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product?.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs bg-neon-red/20 text-neon-red font-bold px-2 py-0.5 rounded-full">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-white/60 leading-relaxed mb-6">{product?.description ?? ''}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="glass-card rounded-lg p-3">
                <p className="text-[10px] text-white/40 uppercase">Category</p>
                <p className="text-sm font-medium">{(product?.category ?? '').split('-').map((w: string) => (w?.[0]?.toUpperCase?.() ?? '') + (w?.slice?.(1) ?? '')).join(' ')}</p>
              </div>
              <div className="glass-card rounded-lg p-3">
                <p className="text-[10px] text-white/40 uppercase">Rarity</p>
                <p className="text-sm font-medium" style={{ color: conf?.color }}>{conf?.label}</p>
              </div>
              <div className="glass-card rounded-lg p-3">
                <p className="text-[10px] text-white/40 uppercase">Stock</p>
                <p className="text-sm font-medium">{product?.stock ?? 0} available</p>
              </div>
              <div className="glass-card rounded-lg p-3">
                <p className="text-[10px] text-white/40 uppercase">Series</p>
                <p className="text-sm font-medium">{product?.animeSeries ?? 'N/A'}</p>
              </div>
            </div>

            {/* Quantity & Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 glass-card rounded-lg px-3 py-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 hover:bg-white/10 rounded">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-mono">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product?.stock ?? 10, quantity + 1))} className="p-1 hover:bg-white/10 rounded">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-neon-purple to-neon-pink border-0 text-white font-bold py-3"
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
              </Button>
              <button
                onClick={handleWishlist}
                className={`p-3 rounded-lg glass-card transition-colors ${wishlisted ? 'text-neon-pink' : 'text-white/40 hover:text-neon-pink'}`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> Authentic</span>
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4" /> Fast Shipping</span>
              <span className="flex items-center gap-1.5"><RotateCcw className="w-4 h-4" /> Easy Returns</span>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        {(product?.reviews ?? []).length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-display font-bold tracking-tight mb-6">
              Customer <span className="text-neon-blue">Reviews</span>
            </h2>
            <div className="space-y-4">
              {(product?.reviews ?? []).map((review: any) => (
                <motion.div key={review?.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-xs font-bold text-neon-purple">
                      {(review?.user?.name ?? 'U')?.[0]?.toUpperCase?.() ?? 'U'}
                    </div>
                    <span className="text-sm font-medium">{review?.user?.name ?? 'Anonymous'}</span>
                    <div className="flex items-center gap-0.5 ml-auto">
                      {Array.from({ length: review?.rating ?? 0 }).map((_, i: number) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-white/60">{review?.comment ?? ''}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {(relatedProducts ?? []).length > 0 && (
          <section>
            <h2 className="text-xl font-display font-bold tracking-tight mb-6">
              You May Also <span className="text-neon-purple">Like</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(relatedProducts ?? []).map((p: any) => (
                <ProductCard key={p?.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

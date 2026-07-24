'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore, CartItemType } from '@/lib/cart-store';
import { RARITY_CONFIG } from '@/lib/constants';
import { Button } from '@/components/ui/button';

export default function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[61] glass-card flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-neon-purple" />
                <h2 className="text-lg font-display font-bold">Your Cart</h2>
                <span className="text-xs text-white/50">({(items ?? []).length} items)</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {(items ?? []).length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-white/40">
                  <ShoppingBag className="w-16 h-16" />
                  <p className="text-lg">Your cart is empty</p>
                  <Link href="/shop" onClick={() => setCartOpen(false)}>
                    <Button className="bg-gradient-to-r from-neon-purple to-neon-pink border-0 text-white">
                      Start Shopping
                    </Button>
                  </Link>
                </div>
              ) : (
                (items ?? []).map((item: CartItemType) => {
                  const rarityConf = RARITY_CONFIG[item?.product?.rarity ?? 'COMMON'] ?? RARITY_CONFIG.COMMON;
                  return (
                    <motion.div
                      key={item?.product?.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                    >
                      <div className="relative w-20 h-20 rounded-md overflow-hidden bg-white/5 flex-shrink-0">
                        <Image
                          src={item?.product?.image ?? ''}
                          alt={item?.product?.name ?? 'Product'}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item?.product?.slug ?? ''}`}
                          onClick={() => setCartOpen(false)}
                          className="text-sm font-medium hover:text-neon-purple transition-colors line-clamp-1"
                        >
                          {item?.product?.name ?? 'Unknown'}
                        </Link>
                        <span
                          className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mt-1"
                          style={{ color: rarityConf?.color, backgroundColor: `${rarityConf?.color}20` }}
                        >
                          {rarityConf?.label}
                        </span>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item?.product?.id ?? '', (item?.quantity ?? 1) - 1)}
                              className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-mono">{item?.quantity ?? 0}</span>
                            <button
                              onClick={() => updateQuantity(item?.product?.id ?? '', (item?.quantity ?? 0) + 1)}
                              className="w-6 h-6 rounded bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-neon-purple">
                              ${((item?.product?.price ?? 0) * (item?.quantity ?? 0)).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item?.product?.id ?? '')}
                              className="p-1 text-white/30 hover:text-neon-red transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {(items ?? []).length > 0 && (
              <div className="border-t border-white/10 p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-bold">${totalPrice().toFixed(2)}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-pink border-0 text-white font-bold py-3">
                  Checkout — ${totalPrice().toFixed(2)}
                </Button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-white/40 hover:text-neon-red transition-colors py-1"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

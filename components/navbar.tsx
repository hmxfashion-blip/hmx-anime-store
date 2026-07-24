'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { data: session, status } = useSession() || {};
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shopDropdown, setShopDropdown] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const shopCategories = [
    { name: 'Action Figures', href: '/shop?category=action-figures' },
    { name: 'Katanas', href: '/shop?category=katanas' },
    { name: 'Cosplay', href: '/shop?category=cosplay' },
    { name: 'Accessories', href: '/shop?category=led-lamps' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery?.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              HMX
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">Home</Link>
            <div
              className="relative"
              onMouseEnter={() => setShopDropdown(true)}
              onMouseLeave={() => setShopDropdown(false)}
            >
              <Link href="/shop" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors flex items-center gap-1">
                Shop <ChevronDown className="w-3 h-3" />
              </Link>
              <AnimatePresence>
                {shopDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-1 glass-card rounded-lg py-2 min-w-[180px]"
                  >
                    {shopCategories.map((cat: { name: string; href: string }) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/shop?sort=bestSeller" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">Best Sellers</Link>
            <Link href="/shop?sort=newest" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">New Arrivals</Link>
            {status === 'authenticated' && (
              <Link href="/wishlist" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">Wishlist</Link>
            )}
            <Link href="/about" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors">Contact</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {status === 'authenticated' && (
              <Link href="/wishlist" className="p-2 text-white/70 hover:text-neon-pink transition-colors hidden sm:block">
                <Heart className="w-5 h-5" />
              </Link>
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="p-2 text-white/70 hover:text-white transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-neon-pink text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems()}
                </span>
              )}
            </button>

            {status === 'authenticated' ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs text-white/50">{session?.user?.name ?? ''}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 text-white/70 hover:text-neon-red transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" className="bg-gradient-to-r from-neon-purple to-neon-pink border-0 text-white text-xs">
                  <User className="w-4 h-4 mr-1" /> Sign In
                </Button>
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/5"
            >
              <form onSubmit={handleSearch} className="max-w-[1200px] mx-auto px-4 py-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search anime merch..."
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-purple/50"
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-white/5"
            >
              <nav className="px-4 py-4 flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileOpen(false)} className="py-2 text-white/70 hover:text-white text-sm">Home</Link>
                <Link href="/shop" onClick={() => setMobileOpen(false)} className="py-2 text-white/70 hover:text-white text-sm">Shop</Link>
                <Link href="/shop?sort=bestSeller" onClick={() => setMobileOpen(false)} className="py-2 text-white/70 hover:text-white text-sm">Best Sellers</Link>
                <Link href="/shop?sort=newest" onClick={() => setMobileOpen(false)} className="py-2 text-white/70 hover:text-white text-sm">New Arrivals</Link>
                {status === 'authenticated' && (
                  <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="py-2 text-white/70 hover:text-white text-sm">Wishlist</Link>
                )}
                <Link href="/about" onClick={() => setMobileOpen(false)} className="py-2 text-white/70 hover:text-white text-sm">About</Link>
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="py-2 text-white/70 hover:text-white text-sm">Contact</Link>
                {status === 'authenticated' ? (
                  <button onClick={() => { signOut({ callbackUrl: '/' }); setMobileOpen(false); }} className="py-2 text-neon-red text-sm text-left">Sign Out</button>
                ) : (
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="py-2 text-neon-purple text-sm">Sign In</Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

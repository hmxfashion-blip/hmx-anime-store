'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/50">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-display font-bold tracking-tight bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue bg-clip-text text-transparent">
              HMX
            </span>
            <p className="text-sm text-white/40 mt-3 max-w-xs">
              Premium anime merchandise for the ultimate collector. Unleash your anime universe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white/80 mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-neon-purple" /> Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/shop" className="text-sm text-white/40 hover:text-neon-purple transition-colors">Shop All</Link>
              <Link href="/about" className="text-sm text-white/40 hover:text-neon-purple transition-colors">About Us</Link>
              <Link href="/contact" className="text-sm text-white/40 hover:text-neon-purple transition-colors">Contact</Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white/80 mb-4">Categories</h4>
            <div className="flex flex-col gap-2">
              <Link href="/shop?category=action-figures" className="text-sm text-white/40 hover:text-neon-purple transition-colors">Action Figures</Link>
              <Link href="/shop?category=katanas" className="text-sm text-white/40 hover:text-neon-purple transition-colors">Katanas</Link>
              <Link href="/shop?category=cosplay" className="text-sm text-white/40 hover:text-neon-purple transition-colors">Cosplay</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 text-center">
          <p className="text-xs text-white/30">© 2026 HMX Anime Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

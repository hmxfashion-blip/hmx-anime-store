'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Shield, Truck, Star, Zap } from 'lucide-react';

const FEATURES = [
  { icon: Shield, title: 'Authentic Products', desc: 'Every item verified for authenticity and quality' },
  { icon: Truck, title: 'Global Shipping', desc: 'Fast worldwide delivery with tracking' },
  { icon: Star, title: 'Premium Quality', desc: 'Hand-selected merchandise from top manufacturers' },
  { icon: Zap, title: 'Rarity System', desc: 'Unique tier classification for every collectible' },
];

export default function AboutPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Sparkles className="w-8 h-8 text-neon-purple mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
            About <span className="text-neon-purple">HMX</span>
          </h1>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
            HMX is your premium destination for authentic anime merchandise. From rare collectible figures to authentic katanas,
            we curate the finest selection of anime-inspired products for passionate collectors and fans worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" ref={ref}>
          {FEATURES.map((feature: any, i: number) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6 text-center hover:border-neon-purple/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-neon-purple/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-neon-purple" />
                </div>
                <h3 className="text-sm font-bold mb-2">{feature.title}</h3>
                <p className="text-xs text-white/40">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 glass-card rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-xl font-display font-bold tracking-tight mb-4">
            Our <span className="text-neon-pink">Mission</span>
          </h2>
          <p className="text-sm text-white/50 leading-relaxed mb-4">
            At HMX, we believe every anime fan deserves access to premium, authentic merchandise. Our unique rarity classification
            system brings the thrill of gaming loot tiers to physical collectibles — from Common everyday items to ultra-rare
            Mythic pieces that define true collectors.
          </p>
          <p className="text-sm text-white/50 leading-relaxed">
            We partner directly with licensed manufacturers and artisans to ensure every product meets our exacting quality standards.
            Whether you are building your first collection or hunting for that elusive Mythic-tier figure, HMX is your gateway
            to the anime universe.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

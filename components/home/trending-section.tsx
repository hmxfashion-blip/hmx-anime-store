'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp } from 'lucide-react';
import ProductCard from '@/components/product-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface TrendingSectionProps {
  products: any[];
}

export default function TrendingSection({ products }: TrendingSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 px-4 bg-white/[0.01]" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-neon-pink" />
              <span className="text-xs text-neon-pink font-bold uppercase tracking-wider">Trending Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
              Hot <span className="text-neon-pink">Picks</span>
            </h2>
          </div>
          <Link href="/shop">
            <Button variant="outline" className="border-white/10 text-white/70 hover:text-white text-xs">
              View All
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(products ?? []).map((product: any, i: number) => (
            <motion.div
              key={product?.id ?? i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

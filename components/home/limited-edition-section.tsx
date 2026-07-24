'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Flame } from 'lucide-react';
import ProductCard from '@/components/product-card';

interface LimitedEditionSectionProps {
  products: any[];
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 3);
    target.setHours(23, 59, 59);

    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const blocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-3">
      {blocks.map((b: { label: string; value: number }) => (
        <div key={b.label} className="text-center">
          <div className="w-14 h-14 rounded-lg glass flex items-center justify-center text-xl font-mono font-bold text-neon-red">
            {String(b.value).padStart(2, '0')}
          </div>
          <span className="text-[10px] text-white/40 mt-1">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function LimitedEditionSection({ products }: LimitedEditionSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  if ((products ?? []).length === 0) return null;

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <div className="glass-card rounded-2xl p-6 md:p-10 border border-neon-red/20 relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-neon-red/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-neon-purple/10 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="relative z-10"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-neon-red" />
                  <span className="text-xs text-neon-red font-bold uppercase tracking-wider animate-neon-pulse">Limited Edition</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
                  Exclusive <span className="text-neon-red">Drops</span>
                </h2>
                <p className="text-white/40 text-sm mt-1">Once they are gone, they are gone forever</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-neon-red" />
                <CountdownTimer />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(products ?? []).map((product: any, i: number) => (
                <motion.div
                  key={product?.id ?? i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

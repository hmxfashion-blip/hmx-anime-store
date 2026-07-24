'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  { name: 'Sakura M.', avatar: '🌸', rating: 5, text: 'The Gojo figure is absolutely insane! The detail is museum-quality. HMX is my go-to for premium anime merch.' },
  { name: 'Ryu K.', avatar: '⚔️', rating: 5, text: 'Ordered the katana and it arrived beautifully packaged. The craftsmanship is exceptional for the price.' },
  { name: 'Luna T.', avatar: '🌙', rating: 4, text: 'Love the rarity system - makes collecting even more exciting! Great customer experience overall.' },
  { name: 'Kenji S.', avatar: '🔥', rating: 5, text: 'The Tanjiro figure exceeded my expectations. Fast shipping and the quality is top-tier. Will definitely order again!' },
];

export default function ReviewsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 px-4 bg-white/[0.01]" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-3">
            What Collectors <span className="text-neon-blue">Say</span>
          </h2>
          <p className="text-white/40 text-sm">Join thousands of satisfied anime fans</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((review: { name: string; avatar: string; rating: number; text: string }, i: number) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5 hover:border-neon-blue/20 transition-all duration-300"
            >
              <Quote className="w-6 h-6 text-neon-blue/30 mb-3" />
              <p className="text-sm text-white/60 mb-4 line-clamp-4">{review.text}</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: review.rating }).map((_, idx: number) => (
                  <Star key={idx} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{review.avatar}</span>
                <span className="text-xs font-medium text-white/70">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

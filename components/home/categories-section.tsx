'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CATEGORIES } from '@/lib/constants';

export default function CategoriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-3">
            Featured <span className="text-neon-purple">Categories</span>
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Discover premium anime merchandise across our curated collections
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {(CATEGORIES ?? []).map((cat: { name: string; slug: string; image: string }, i: number) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/shop?category=${cat.slug}`}>
                <div className="group relative aspect-[4/3] rounded-xl overflow-hidden glass-card cursor-pointer">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: 'inset 0 0 30px rgba(168, 85, 247, 0.2)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-neon-purple transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

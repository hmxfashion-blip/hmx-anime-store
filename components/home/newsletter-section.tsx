'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function NewsletterSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email?.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        toast.success('Welcome to the HMX family! Check your inbox for 10% off.');
        setEmail('');
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data?.error ?? 'Something went wrong');
      }
    } catch {
      toast.error('Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="glass-card rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <Sparkles className="w-8 h-8 text-neon-purple mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-3">
              Get <span className="text-neon-purple">10% Off</span> Your First Order
            </h2>
            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
              Join the HMX newsletter for exclusive drops, early access to limited editions, and a welcome discount.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-purple/50"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-neon-purple to-neon-pink border-0 text-white font-bold px-6 py-3 w-full sm:w-auto"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

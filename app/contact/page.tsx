'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success('Message sent! We will get back to you soon.');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error('Failed to send message');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-16 px-4">
      <div className="max-w-[600px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <MessageSquare className="w-8 h-8 text-neon-blue mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
            Get in <span className="text-neon-blue">Touch</span>
          </h1>
          <p className="text-white/40 text-sm">Have a question? We would love to hear from you.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-blue/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-blue/50"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-blue/50"
                placeholder="What is this about?"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 mb-1.5 block">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-neon-blue/50 resize-none"
                placeholder="Your message..."
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-neon-blue to-neon-purple border-0 text-white font-bold py-3"
            >
              {loading ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
            </Button>
            <p className="text-[10px] text-white/20 text-center">Your message will be stored securely and we will respond promptly.</p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

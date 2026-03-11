// page.tsx (Signup)
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/src/context/UserContext';
import { ArrowRight, User } from 'lucide-react';

export default function Signup() {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-neutral-100 via-neutral-200 to-neutral-300 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-blue/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-success/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl  max-w-md w-full border border-white/50"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center bg-linear-to-r from-primary-blue to-success bg-clip-text text-transparent">
            Welcome to CodeLeap NetWork!
          </h1>
          <p className="text-neutral-500 text-center mb-8 text-sm">
            Join our community of developers and start sharing your ideas today.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <label className="block text-sm font-semibold text-neutral-600 ml-1">
              Please enter your username
            </label>
            <div className={`relative transition-all duration-300 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <User className="w-5 h-5" />
              </div>
              <input 
                type="text"
                placeholder="john doe"
                className="w-full bg-neutral-100 border-2 border-neutral-300 rounded-xl pl-12 pr-4 py-4 outline-none transition-all duration-200 text-neutral-700 placeholder-neutral-400 font-medium
                  focus:border-primary-blue focus:bg-white hover:border-neutral-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={20}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-medium">
                {name.length}/20
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              type="submit"
              disabled={!name.trim()}
              whileHover={name.trim() ? { scale: 1.02, y: -2 } : {}}
              whileTap={name.trim() ? { scale: 0.98 } : {}}
              className={`w-full group relative overflow-hidden rounded-xl py-4 font-bold text-lg tracking-wide transition-all duration-300
                ${name.trim() 
                  ? 'bg-linear-to-r from-primary-blue to-primary-dark text-white shadow-lg shadow-primary-blue/40 hover:shadow-xl hover:shadow-primary-blue/50' 
                  : 'bg-neutral-300 text-neutral-400 cursor-not-allowed'
                }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Enter
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${name.trim() ? 'group-hover:translate-x-1' : ''}`} />
              </span>
              {name.trim() && (
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-primary-dark to-primary-blue"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </main>
  );
}
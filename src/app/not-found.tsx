// not-found.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-linear-to-br from-neutral-100 via-neutral-200 to-neutral-300 flex items-center justify-center p-4 relative overflow-hidden">

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="relative bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-[0_25px_80px_-20px_rgba(0,0,0,0.15)] max-w-lg w-full border border-white/60 text-center"
      >
        {/* 404 Illustration */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="bg-linear-to-br from-primary-blue/20 to-success/20 p-6 rounded-full">
              <div className="bg-linear-to-br from-primary-blue to-primary-dark p-5 rounded-full shadow-xl shadow-primary-blue/30">
                <FileQuestion size={48} className="text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-linear-to-r from-primary-blue via-success to-primary-blue bg-clip-text text-transparent">
            Oops!
          </h1>
          <h2 className="text-2xl font-bold mb-4 text-neutral-700">
            Page not found
          </h2>
          
          <p className="text-neutral-500 mb-8 leading-relaxed text-lg">
            The page you{"'"}re looking for seems to have vanished into the digital void. 
            Let{"'"}s get you back on track.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/" className="flex-1">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-linear-to-r from-primary-blue to-primary-dark text-white py-4 rounded-xl font-bold shadow-lg shadow-primary-blue/30 hover:shadow-xl hover:shadow-primary-blue/40 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </motion.button>
          </Link>
          
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 bg-white border-2 border-neutral-200 text-neutral-600 py-4 rounded-xl font-bold hover:border-primary-blue hover:text-primary-blue transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
}
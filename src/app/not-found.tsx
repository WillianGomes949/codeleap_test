// not-found.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#DDDDDD] via-[#e5e5e5] to-[#d5d5d5] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-64 h-64 border-4 border-[#7695EC]/10 rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-48 h-48 border-4 border-[#FF5151]/10 rounded-full"
        />
      </div>

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
            <div className="bg-gradient-to-br from-[#7695EC]/20 to-[#47B960]/20 p-6 rounded-full">
              <div className="bg-gradient-to-br from-[#7695EC] to-[#5a7bd4] p-5 rounded-full shadow-xl shadow-[#7695EC]/30">
                <FileQuestion size={48} className="text-white" />
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2 bg-[#FF5151] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
            >
              404
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[#7695EC] via-[#47B960] to-[#7695EC] bg-clip-text text-transparent">
            Oops!
          </h1>
          <h2 className="text-2xl font-bold mb-4 text-[#333333]">
            Page not found
          </h2>
          
          <p className="text-[#777777] mb-8 leading-relaxed text-lg">
            The page you're looking for seems to have vanished into the digital void. 
            Let's get you back on track.
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
              className="w-full bg-gradient-to-r from-[#7695EC] to-[#5a7bd4] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#7695EC]/30 hover:shadow-xl hover:shadow-[#7695EC]/40 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Back to Home
            </motion.button>
          </Link>
          
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 bg-white border-2 border-[#e0e0e0] text-[#555555] py-4 rounded-xl font-bold hover:border-[#7695EC] hover:text-[#7695EC] transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-[#e0e0e0]"
        >
          <p className="text-sm text-[#999999]">
            Lost? Contact our{' '}
            <a href="#" className="text-[#7695EC] hover:underline font-medium">
              support team
            </a>
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#DDDDDD] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-10 rounded-2xl shadow-sm max-w-125 w-full border border-[#CCCCCC] text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-[#7695EC]/10 p-4 rounded-full">
            <FileQuestion size={64} className="text-[#7695EC]" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-black">404</h1>
        <h2 className="text-xl font-bold mb-4 text-black">Page not found</h2>
        
        <p className="text-[#777777] mb-8 leading-relaxed">
          The page you are looking for doesnt exist or has been moved to another URL.
        </p>

        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#7695EC] text-white py-3 rounded-lg font-bold uppercase tracking-wider transition-colors hover:bg-[#5f81e0]"
          >
            Go back to home
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
// SkeletonLoader.tsx
'use client';
import { motion } from 'framer-motion';

export function SkeletonLoader() {
  const skeletons = Array.from({ length: 3 });

  return (
    <div className="w-full mt-6 space-y-6">
      {skeletons.map((_, index) => (
        <motion.article 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] border border-[#f0f0f0]"
        >
          {/* Header Skeleton */}
          <div className="bg-linear-to-r from-primary-blue/20 to-primary-dark/20 h-16 px-5 flex items-center justify-between">
            <div className="h-5 bg-white/50 rounded-lg w-1/3 animate-pulse" />
            <div className="flex gap-2 items-center">
              <div className="h-9 w-9 bg-white/50 rounded-xl animate-pulse" />
              <div className="h-9 w-9 bg-white/50 rounded-xl animate-pulse" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 bg-[#f0f0f0] rounded-xl animate-pulse" />
                <div className="h-4 bg-[#f0f0f0] rounded-lg w-24 animate-pulse" />
              </div>
              <div className="h-8 bg-neutral-100 rounded-full w-28 animate-pulse" />
            </div>
            
            <div className="space-y-3">
              <div className="h-4 bg-[#f0f0f0] rounded-lg w-full animate-pulse" />
              <div className="h-4 bg-[#f0f0f0] rounded-lg w-[95%] animate-pulse" />
              <div className="h-4 bg-[#f0f0f0] rounded-lg w-[80%] animate-pulse" />
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
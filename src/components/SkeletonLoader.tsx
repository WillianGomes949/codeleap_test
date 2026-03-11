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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="border border-[#CCCCCC] rounded-2xl overflow-hidden bg-white shadow-sm"
        >
          {/* Header Skeleton */}
          <header className="bg-linear-to-r from-gray-200 to-gray-300 h-16 px-5 flex items-center justify-between">
            <div className="h-5 bg-gray-300/80 rounded-md w-1/3 animate-pulse" />
            <div className="flex gap-3 items-center">
              <div className="h-8 w-8 bg-gray-300/80 rounded-full animate-pulse" />
              <div className="h-8 w-8 bg-gray-300/80 rounded-full animate-pulse" />
            </div>
          </header>

          {/* Content Skeleton */}
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse" />
              </div>
              <div className="h-8 bg-gray-100 rounded-full w-28 animate-pulse" />
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md w-[95%] animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md w-[80%] animate-pulse" />
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
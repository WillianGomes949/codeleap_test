// CreatePost.tsx
'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { usePosts } from '../hooks/usePosts';
import { Send, Loader2, Sparkles, Type, AlignLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState<'title' | 'content' | null>(null);
  const { username } = useUser();
  const { createPost, isCreating } = usePosts();

  const handleCreate = () => {
    if (username && title.trim() && content.trim()) {
      createPost(
        { username, title: title.trim(), content: content.trim() },
        { 
          onSuccess: () => { 
            setTitle(''); 
            setContent(''); 
          } 
        }
      );
    }
  };

  const isValid = title.trim().length > 0 && content.trim().length > 0;
  const progress = Math.min(((title.length + content.length) / 1100) * 100, 100);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-[0_4px_20px_-4px_rgba(118,149,236,0.15)] border border-[#e8e8e8] hover:shadow-[0_8px_30px_-4px_rgba(118,149,236,0.2)] transition-all duration-500"
    >
      {/* Progress bar */}
      <div className="h-1 bg-[#f0f0f0] rounded-full mb-6 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#7695EC] to-[#47B960] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex items-center gap-4 mb-6">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7695EC] to-[#5a7bd4] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#7695EC]/30"
        >
          {username?.charAt(0).toUpperCase()}
        </motion.div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-[#333333] flex items-center gap-2">
            What's on your mind?
            <Sparkles className="w-4 h-4 text-[#7695EC]" />
          </h2>
          <p className="text-sm text-[#777777]">Share your thoughts with the community</p>
        </div>
      </div>
      
      <div className="space-y-5">
        <motion.div 
          className="relative"
          animate={{ scale: isFocused === 'title' ? 1.01 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 flex items-center gap-2 ${isFocused === 'title' ? 'text-[#7695EC]' : 'text-[#555555]'}`}>
            <Type className="w-4 h-4" />
            Title
            <span className="text-xs font-normal text-[#999999] ml-auto">({title.length}/100)</span>
          </label>
          <input 
            className={`w-full bg-[#f8f9fa] border-2 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 text-[#333333] placeholder-[#aaaaaa] font-medium
              ${isFocused === 'title' 
                ? 'border-[#7695EC] bg-white shadow-[0_0_0_4px_rgba(118,149,236,0.1)]' 
                : 'border-[#e0e0e0] hover:border-[#d0d0d0]'
              }`}
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 100))}
            onFocus={() => setIsFocused('title')}
            onBlur={() => setIsFocused(null)}
            placeholder="Give your post a catchy title..."
          />
        </motion.div>

        <motion.div 
          className="relative"
          animate={{ scale: isFocused === 'content' ? 1.01 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <label className={`block text-sm font-semibold mb-2 transition-colors duration-200 flex items-center gap-2 ${isFocused === 'content' ? 'text-[#7695EC]' : 'text-[#555555]'}`}>
            <AlignLeft className="w-4 h-4" />
            Content
            <span className="text-xs font-normal text-[#999999] ml-auto">({content.length}/1000)</span>
          </label>
          <textarea 
            className={`w-full bg-[#f8f9fa] border-2 rounded-xl px-4 py-3.5 min-h-[140px] outline-none transition-all duration-300 resize-none text-[#333333] placeholder-[#aaaaaa] font-medium leading-relaxed
              ${isFocused === 'content' 
                ? 'border-[#7695EC] bg-white shadow-[0_0_0_4px_rgba(118,149,236,0.1)]' 
                : 'border-[#e0e0e0] hover:border-[#d0d0d0]'
              }`}
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, 1000))}
            onFocus={() => setIsFocused('content')}
            onBlur={() => setIsFocused(null)}
            placeholder="Write your thoughts here... Be creative! ✨"
          />
        </motion.div>
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t border-[#f0f0f0]">
        <motion.button
          onClick={handleCreate}
          disabled={!isValid || isCreating}
          whileHover={isValid && !isCreating ? { scale: 1.02, y: -2 } : {}}
          whileTap={isValid && !isCreating ? { scale: 0.98 } : {}}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all duration-300 shadow-lg
            ${isValid && !isCreating 
              ? 'bg-gradient-to-r from-[#7695EC] to-[#5a7bd4] text-white shadow-[#7695EC]/30 hover:shadow-xl hover:shadow-[#7695EC]/40' 
              : 'bg-[#e8e8e8] text-[#aaaaaa] cursor-not-allowed shadow-none'
            }
          `}
        >
          <AnimatePresence mode="wait">
            {isCreating ? (
              <motion.span 
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Loader2 className="w-5 h-5 animate-spin" />
                Publishing...
              </motion.span>
            ) : (
              <motion.span 
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Publish Post
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.section>
  );
}
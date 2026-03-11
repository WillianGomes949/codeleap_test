// PostCard.tsx
'use client';

import { Trash2, Edit, MessageCircle, Clock, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useUser } from '@/src/context/UserContext';
import { Post } from '@/src/hooks/usePosts';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PostCardProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
  index?: number;
}

export function PostCard({ post, onEdit, onDelete, index = 0 }: PostCardProps) {
  const { username } = useUser();
  const isOwner = username === post.username;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formattedDate = mounted 
    ? formatDistanceToNow(new Date(post.created_datetime), { addSuffix: true, locale: enUS })
    : 'Just now';

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', damping: 20 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl overflow-hidden mb-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_-8px_rgba(118,149,236,0.25)] border border-[#f0f0f0] hover:border-[#7695EC]/30 transition-all duration-500"
    >
      <header className="bg-gradient-to-r from-[#7695EC] to-[#5a7bd4] p-5 flex justify-between items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <h2 className="text-lg font-bold truncate pr-4 relative z-10 flex items-center gap-3">
          <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="drop-shadow-sm">{post.title}</span>
        </h2>
        
        {isOwner && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-1 relative z-10"
          >
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onDelete} 
              className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              title="Delete post"
            >
              <Trash2 size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onEdit} 
              className="p-2.5 rounded-xl hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              title="Edit post"
            >
              <Edit size={18} />
            </motion.button>
          </motion.div>
        )}
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-5 pb-5 border-b border-[#f5f5f5]">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7695EC] to-[#5a7bd4] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#7695EC]/20"
            >
              {post.username.charAt(0).toUpperCase()}
            </motion.div>
            <div>
              <span className="font-bold text-[#333333] block text-sm">@{post.username}</span>
              {isOwner && (
                <span className="text-xs font-medium px-2 py-0.5 bg-[#7695EC]/10 text-[#7695EC] rounded-full">
                  You
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-[#777777] bg-[#f8f9fa] px-3 py-2 rounded-full border border-[#f0f0f0]">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">{formattedDate}</span>
          </div>
        </div>
        
        <p className="text-[#555555] text-base leading-relaxed whitespace-pre-wrap break-words">
          {post.content}
        </p>
      </div>
    </motion.article>
  );
}
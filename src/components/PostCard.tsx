// PostCard.tsx
'use client';

import { Trash2, Edit, MessageCircle, Clock } from 'lucide-react';
import { useUser } from '@/src/context/UserContext';
import { Post } from '@/src/hooks/usePosts';
import { motion } from 'framer-motion';
import { ClientDate } from './ClientDate';

interface PostCardProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
  index?: number;
}

export function PostCard({ post, onEdit, onDelete, index = 0 }: PostCardProps) {
  const { username } = useUser();
  const isOwner = username === post.username;

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border border-[#999999] rounded-2xl overflow-hidden mb-6 bg-white shadow-sm hover:shadow-lg hover:shadow-[#7695EC]/10 transition-all duration-300 group"
    >
      <header className="bg-[#7695EC] p-5 flex justify-between items-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-[#7695EC] to-[#5a7bd4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <h2 className="text-lg font-bold truncate pr-4 relative z-10 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 opacity-80" />
          {post.title}
        </h2>
        
        {isOwner && (
          <div className="flex gap-2 relative z-10">
            <button 
              onClick={onDelete} 
              className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110 active:scale-95"
              title="Delete post"
            >
              <Trash2 size={18} />
            </button>
            <button 
              onClick={onEdit} 
              className="p-2 rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110 active:scale-95"
              title="Edit post"
            >
              <Edit size={18} />
            </button>
          </div>
        )}
      </header>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#7695EC] to-[#5a7bd4] flex items-center justify-center text-white font-bold text-sm shadow-md">
              {post.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="font-bold text-gray-900 block">@{post.username}</span>
              {isOwner && <span className="text-xs text-[#7695EC] font-medium">You</span>}
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-sm text-[#777777] bg-gray-50 px-3 py-1.5 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>
              <ClientDate date={post.created_datetime} />
            </span>
          </div>
        </div>
        
        <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap wrap-break-words">
          {post.content}
        </p>
      </div>
    </motion.article>
  );
}
// PostCard.tsx
"use client";

import { Trash2, Edit, MessageCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Post } from "../hooks/usePosts";

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
    ? formatDistanceToNow(new Date(post.created_datetime), {
        addSuffix: true,
        locale: enUS,
      })
    : "Just now";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        damping: 20,
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl overflow-hidden mb-6 shadow-sm hover:shadow-sm transition-all duration-500 border border-neutral-200 hover:border-primary-blue/30 "
    >
      <header
        className={`justify-between items-center text-white relative overflow-hidden p-5 flex
          ${
            isOwner
              ? `bg-linear-to-r from-success-dark to-success`
              : `bg-linear-to-r from-primary-blue to-primary-dark`
          }`}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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
        <div className="flex justify-between items-center mb-5 pb-5 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className={`flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary-blue/20 w-11 h-11 rounded-xl 
              ${
                isOwner
                  ? `bg-linear-to-r from-success-dark to-success`
                  : `bg-linear-to-r from-primary-blue to-primary-dark`
              }`}
            >
              {post.username.charAt(0).toUpperCase()}
            </motion.div>
            <div>
              <span className="font-bold text-neutral-700 block text-sm">
                @{post.username}
              </span>
              {isOwner && (
                <span className="text-xs font-medium px-2 py-0.5 bg-success/10 text-success rounded-full">
                  You
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 bg-neutral-100 px-3 py-2 rounded-full border border-neutral-200">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-normal">{formattedDate}</span>
          </div>
        </div>

        <p className="text-neutral-600 text-base leading-relaxed whitespace-pre-wrap wrap-break-words">
          {post.content}
        </p>
      </div>
    </motion.article>
  );
}

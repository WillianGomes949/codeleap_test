'use client';

import { Trash2, Edit } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useUser } from '@/src/context/UserContext'; // Ajustado para alias
import { Post } from '@/src/hooks/usePosts'; // Importando a tipagem correta

interface PostCardProps {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

export function PostCard({ post, onEdit, onDelete }: PostCardProps) {
  const { username } = useUser();
  const isOwner = username === post.username;

  return (
    <article className="border border-[#999999] rounded-2xl overflow-hidden mb-6 bg-white shadow-sm">
      <header className="bg-[#7695EC] p-6 flex justify-between items-center text-white">
        <h2 className="text-xl font-bold truncate pr-4">{post.title}</h2>
        {isOwner && (
          <div className="flex gap-6 items-center">
            <button onClick={onDelete} className="hover:text-red-200 transition-colors"><Trash2 size={22} /></button>
            <button onClick={onEdit} className="hover:text-blue-200 transition-colors"><Edit size={22} /></button>
          </div>
        )}
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center text-[#777777] mb-4">
          <span className="font-bold text-lg truncate max-w-[50%]">@{post.username}</span>
          <span className="text-sm">
            {formatDistanceToNow(new Date(post.created_datetime), { addSuffix: true, locale: enUS })}
          </span>
        </div>
        <p className="text-black text-base leading-relaxed whitespace-pre-wrap wrap-break-words">
          {post.content}
        </p>
      </div>
    </article>
  );
}
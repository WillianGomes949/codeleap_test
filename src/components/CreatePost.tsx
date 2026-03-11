// CreatePost.tsx
'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { usePosts } from '../hooks/usePosts';
import { Send, Loader2 } from 'lucide-react';

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

  return (
    <section className="border border-[#999999] rounded-2xl p-6 mb-8 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#7695EC] flex items-center justify-center text-white font-bold text-lg">
          {username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">What{"'"}s on your mind?</h2>
          <p className="text-sm text-[#777777]">Share your thoughts with the community</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="relative">
          <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isFocused === 'title' ? 'text-[#7695EC]' : 'text-gray-700'}`}>
            Title
          </label>
          <input 
            className={`w-full border rounded-lg px-4 py-3 outline-none transition-all duration-200 bg-gray-50 focus:bg-white ${
              isFocused === 'title' 
                ? 'border-[#7695EC] ring-2 ring-[#7695EC]/20' 
                : 'border-[#777777] hover:border-[#999999]'
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsFocused('title')}
            onBlur={() => setIsFocused(null)}
            placeholder="Give your post a catchy title..."
            maxLength={100}
          />
          <span className="absolute right-3 bottom-3 text-xs text-gray-400">
            {title.length}/100
          </span>
        </div>

        <div className="relative">
          <label className={`block text-sm font-medium mb-2 transition-colors duration-200 ${isFocused === 'content' ? 'text-[#7695EC]' : 'text-gray-700'}`}>
            Content
          </label>
          <textarea 
            className={`w-full border rounded-lg px-4 py-3 min-h-30 outline-none transition-all duration-200 resize-none bg-gray-50 focus:bg-white ${
              isFocused === 'content' 
                ? 'border-[#7695EC] ring-2 ring-[#7695EC]/20' 
                : 'border-[#777777] hover:border-[#999999]'
            }`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsFocused('content')}
            onBlur={() => setIsFocused(null)}
            placeholder="Write your thoughts here..."
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-gray-400">
              {content.length}/1000 characters
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleCreate}
          disabled={!isValid || isCreating}
          className={`
            flex items-center gap-2 px-8 py-2.5 rounded-lg font-bold transition-all duration-200
            ${isValid && !isCreating 
              ? 'bg-[#7695EC] text-white hover:bg-[#5a7bd4] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isCreating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Publish
            </>
          )}
        </button>
      </div>
    </section>
  );
}
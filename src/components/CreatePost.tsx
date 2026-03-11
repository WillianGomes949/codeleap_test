'use client';

import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { usePosts } from '../hooks/usePosts';

export function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { username } = useUser();
  const { createPost, isCreating } = usePosts();

  const handleCreate = () => {
    if (username) {
      createPost(
        { username, title, content },
        { onSuccess: () => { setTitle(''); setContent(''); } }
      );
    }
  };

  return (
    <section className="border border-[#999999] rounded-2xl p-6 mb-6 bg-white">
      <h2 className="text-xl font-bold mb-6">Whats on your mind?</h2>
      
      <label className="block mb-2">Title</label>
      <input 
        className="w-full border border-[#777777] rounded-lg p-2 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Hello world"
      />

      <label className="block mb-2">Content</label>
      <textarea 
        className="w-full border border-[#777777] rounded-lg p-2 mb-4 min-h-30"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content here"
      />

      <div className="flex justify-end">
        <button
          onClick={handleCreate}
          disabled={!title || !content || isCreating}
          className="bg-[#7695EC] text-white px-8 py-1.5 rounded-lg font-bold disabled:bg-gray-400"
        >
          {isCreating ? 'Creating...' : 'Create'}
        </button>
      </div>
    </section>
  );
}
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePosts } from '@/src/hooks/usePosts';
import { CreatePost } from '@/src/components/CreatePost';
import { PostCard } from '@/src/components/PostCard';
import { DeleteModal } from '@/src/components/DeleteModal';
import { EditModal } from '@/src/components/EditModal';
import { Post } from '@/src/hooks/usePosts';
import { useUser } from '@/src/context/UserContext'; // Importar o contexto do usuário
import { LogOut } from 'lucide-react'; // Ícone moderno de saída

export default function FeedPage() {
  const { posts, deletePost, updatePost } = usePosts();
  const { logout } = useUser(); // Pegar a função de logout
  
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = () => {
    if (selectedPost) {
      deletePost(selectedPost.id, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setSelectedPost(null);
        }
      });
    }
  };

  const handleEdit = (title: string, content: string) => {
    if (selectedPost) {
      updatePost(
        { id: selectedPost.id, data: { title, content } },
        { onSuccess: () => {
          setIsEditOpen(false);
          setSelectedPost(null);
        }}
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#DDDDDD] flex flex-col items-center">
      {/* Header Fixo - Adicionado botão de Logout */}
      <header className="w-full max-w-200 bg-[#7695EC] p-7 flex items-center justify-between shadow-sm">
        <h1 className="text-white text-2xl font-bold">CodeLeap Network</h1>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={logout}
          className="text-white flex items-center gap-2 hover:text-red-200 transition-colors font-bold"
          title="Logout"
        >
          <span className="hidden sm:inline">Logout</span>
          <LogOut size={24} />
        </motion.button>
      </header>

      <section className="w-full max-w-200 bg-white min-h-screen p-6 shadow-sm">
        <CreatePost />

        <div className="mt-6">
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <PostCard 
                  post={post} 
                  onEdit={() => {
                    setSelectedPost(post);
                    setIsEditOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedPost(post);
                    setIsDeleteOpen(true);
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <DeleteModal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDelete} 
      />

      <EditModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        onSave={handleEdit}
        initialTitle={selectedPost?.title || ''}
        initialContent={selectedPost?.content || ''}
      />
    </main>
  );
}
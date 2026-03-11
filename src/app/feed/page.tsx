"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePosts } from "@/src/hooks/usePosts";
import { CreatePost } from "@/src/components/CreatePost";
import { PostCard } from "@/src/components/PostCard";
import { DeleteModal } from "@/src/components/DeleteModal";
import { EditModal } from "@/src/components/EditModal";
import { Post } from "@/src/hooks/usePosts";
import { useUser } from "@/src/context/UserContext";
import { LogOut } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function FeedPage() {
  const { posts, deletePost, updatePost } = usePosts();
  const { logout } = useUser();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Estados para controlar o modal de edição
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const handleDelete = () => {
    if (selectedPost) {
      deletePost(selectedPost.id, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setSelectedPost(null);
          toast.success("Post deleted successfully!");
        },
      });
    }
  };

  const handleEdit = (title: string, content: string) => {
    if (selectedPost) {
      updatePost(
        { id: selectedPost.id, data: { title, content } },
        {
          onSuccess: () => {
            setIsEditOpen(false);
            setSelectedPost(null);
            toast.success("Post Edit successfully!");
          },
        },
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#DDDDDD] flex flex-col items-center">
      <Toaster position="top-right" richColors />

      {/* Header Responsivo */}
      <header className="w-full max-w-200 bg-[#7695EC] p-4 sm:p-7 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <h1 className="text-white text-xl sm:text-2xl font-bold">
          CodeLeap Network
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="text-white flex items-center gap-2 font-bold bg-white/10 px-3 py-1 rounded-lg hover:bg-white/20 transition-colors"
        >
          <span className="hidden xs:inline">Logout</span>
          <LogOut size={20} />
        </motion.button>
      </header>

      {/* Container Adaptável */}
      <section className="w-full max-w-200 bg-white min-h-screen p-4 sm:p-6 shadow-sm">
        <CreatePost />

        <div className="mt-6 flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                layout // Faz os outros posts deslizarem suavemente quando um sai
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
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
        onClose={() => {
          setIsEditOpen(false);
          setSelectedPost(null);
        }}
        onSave={handleEdit}
        title={editTitle}
        content={editContent}
        onTitleChange={setEditTitle}
        onContentChange={setEditContent}
      />
    </main>
  );
}

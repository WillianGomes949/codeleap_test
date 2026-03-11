'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  initialTitle: string;
  initialContent: string;
}

export function EditModal({ isOpen, onClose, onSave, initialTitle, initialContent }: EditModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-[660px]"
          >
            <h2 className="text-xl font-bold mb-6">Edit item</h2>
            
            <label className="block mb-2 text-sm">Title</label>
            <input 
              className="w-full border border-[#777777] rounded-lg p-2 mb-4 outline-none focus:ring-1 focus:ring-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="block mb-2 text-sm">Content</label>
            <textarea 
              className="w-full border border-[#777777] rounded-lg p-2 mb-6 min-h-[120px] outline-none focus:ring-1 focus:ring-black"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex justify-end gap-4">
              <button 
                onClick={onClose}
                className="px-8 py-1.5 border border-[#999999] rounded-lg font-bold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => onSave(title, content)}
                disabled={!title || !content}
                className="px-8 py-1.5 bg-[#47B960] text-white rounded-lg font-bold disabled:bg-gray-300 hover:bg-green-600 transition-colors"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
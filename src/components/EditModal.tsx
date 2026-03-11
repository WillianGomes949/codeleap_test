// EditModal.tsx - Versão uncontrolled
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Edit3 } from 'lucide-react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
  initialTitle: string;
  initialContent: string;
}

export function EditModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialTitle = '',        
  initialContent = '',      
}: EditModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Atualiza estado quando o modal abre com novos valores
  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [isOpen, initialTitle, initialContent]);

  const safeTitle = String(title ?? '');
  const safeContent = String(content ?? '');
  
  const hasChanges = safeTitle.trim().length > 0 && safeContent.trim().length > 0;

  const handleSave = () => {
    if (hasChanges) {
      onSave(safeTitle.trim(), safeContent.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value.slice(0, 100));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value.slice(0, 1000));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
        >
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#47B960]/10 px-6 py-4 border-b border-[#47B960]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#47B960] rounded-full flex items-center justify-center text-white">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Edit Post</h2>
                  <p className="text-sm text-gray-600">Make changes to your content</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white/50 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Title
                    <span className="text-xs font-normal text-gray-400">({safeTitle.length}/100)</span>
                  </label>
                </div>
                <input 
                  type="text"
                  className="w-full border border-[#777777] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#47B960]/30 focus:border-[#47B960] transition-all duration-200 text-gray-900 placeholder-gray-400 bg-white"
                  value={safeTitle}
                  onChange={handleTitleChange}
                  placeholder="Enter post title..."
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    Content
                    <span className="text-xs font-normal text-gray-400">({safeContent.length}/1000)</span>
                  </label>
                  <span className="text-xs text-gray-400">Pro tip: Press Cmd/Ctrl + Enter to save</span>
                </div>
                <textarea 
                  className="w-full border border-[#777777] rounded-lg px-4 py-3 min-h-48 outline-none focus:ring-2 focus:ring-[#47B960]/30 focus:border-[#47B960] transition-all duration-200 resize-y text-gray-900 placeholder-gray-400 leading-relaxed bg-white"
                  value={safeContent}
                  onChange={handleContentChange}
                  placeholder="Write your content here..."
                />
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-2.5 border border-[#999999] rounded-lg font-semibold text-gray-700 hover:bg-white hover:border-[#777777] transition-all duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={!hasChanges}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200
                  ${hasChanges 
                    ? 'bg-[#47B960] text-white hover:bg-[#3da852] hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 active:translate-y-0' 
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
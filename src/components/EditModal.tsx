// EditModal.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Edit3, Type, AlignLeft, Check } from 'lucide-react';

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
  const [isFocused, setIsFocused] = useState<'title' | 'content' | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setContent(initialContent);
    }
  }, [isOpen, initialTitle, initialContent]);

  const safeTitle = String(title ?? '');
  const safeContent = String(content ?? '');
  
  const hasChanges = safeTitle.trim().length > 0 && safeContent.trim().length > 0;
  const titleProgress = Math.min((safeTitle.length / 100) * 100, 100);
  const contentProgress = Math.min((safeContent.length / 1000) * 100, 100);

  const handleSave = () => {
    if (hasChanges) {
      onSave(safeTitle.trim(), safeContent.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSave();
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
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#47B960]/10 to-[#47B960]/5 px-6 py-5 border-b border-[#47B960]/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="w-12 h-12 bg-gradient-to-br from-[#47B960] to-[#3da852] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#47B960]/30"
                >
                  <Edit3 className="w-6 h-6" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-[#333333]">Edit Post</h2>
                  <p className="text-sm text-[#777777]">Refine your content</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-[#999999] hover:text-[#555555] transition-colors p-2 hover:bg-[#f5f5f5] rounded-full"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="p-6 space-y-6">
              {/* Title Input */}
              <motion.div 
                className="space-y-2"
                animate={{ scale: isFocused === 'title' ? 1.01 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center">
                  <label className={`text-sm font-semibold flex items-center gap-2 transition-colors ${isFocused === 'title' ? 'text-[#47B960]' : 'text-[#555555]'}`}>
                    <Type className="w-4 h-4" />
                    Title
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#47B960] to-[#6bc780] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${titleProgress}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#999999] font-medium">{safeTitle.length}/100</span>
                  </div>
                </div>
                <input 
                  type="text"
                  className={`w-full bg-[#f8f9fa] border-2 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 text-[#333333] placeholder-[#aaaaaa] font-medium
                    ${isFocused === 'title' 
                      ? 'border-[#47B960] bg-white shadow-[0_0_0_4px_rgba(71,185,96,0.1)]' 
                      : 'border-[#e0e0e0] hover:border-[#d0d0d0]'
                    }`}
                  value={safeTitle}
                  onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                  onFocus={() => setIsFocused('title')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Enter post title..."
                  autoFocus
                />
              </motion.div>

              {/* Content Input */}
              <motion.div 
                className="space-y-2"
                animate={{ scale: isFocused === 'content' ? 1.01 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center">
                  <label className={`text-sm font-semibold flex items-center gap-2 transition-colors ${isFocused === 'content' ? 'text-[#47B960]' : 'text-[#555555]'}`}>
                    <AlignLeft className="w-4 h-4" />
                    Content
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-[#f0f0f0] rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#47B960] to-[#6bc780] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${contentProgress}%` }}
                      />
                    </div>
                    <span className="text-xs text-[#999999] font-medium">{safeContent.length}/1000</span>
                  </div>
                </div>
                <textarea 
                  className={`w-full bg-[#f8f9fa] border-2 rounded-xl px-4 py-3.5 min-h-[200px] outline-none transition-all duration-300 resize-y text-[#333333] placeholder-[#aaaaaa] font-medium leading-relaxed
                    ${isFocused === 'content' 
                      ? 'border-[#47B960] bg-white shadow-[0_0_0_4px_rgba(71,185,96,0.1)]' 
                      : 'border-[#e0e0e0] hover:border-[#d0d0d0]'
                    }`}
                  value={safeContent}
                  onChange={(e) => setContent(e.target.value.slice(0, 1000))}
                  onFocus={() => setIsFocused('content')}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Write your content here..."
                />
                <p className="text-xs text-[#999999] flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Pro tip: Press Cmd/Ctrl + Enter to save quickly
                </p>
              </motion.div>
            </div>

            <div className="p-6 bg-gradient-to-r from-[#f8f9fa] to-[#f5f5f5] border-t border-[#e8e8e8] flex justify-end gap-3">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-3 border-2 border-[#e0e0e0] rounded-xl font-semibold text-[#555555] hover:border-[#999999] hover:bg-white transition-all duration-200"
              >
                Cancel
              </motion.button>
              <motion.button 
                whileHover={hasChanges ? { scale: 1.02, y: -2 } : {}}
                whileTap={hasChanges ? { scale: 0.98 } : {}}
                onClick={handleSave}
                disabled={!hasChanges}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg
                  ${hasChanges 
                    ? 'bg-gradient-to-r from-[#47B960] to-[#3da852] text-white shadow-[#47B960]/30 hover:shadow-xl hover:shadow-[#47B960]/40' 
                    : 'bg-[#e8e8e8] text-[#aaaaaa] cursor-not-allowed shadow-none'
                  }
                `}
              >
                <Save className="w-4 h-4" />
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
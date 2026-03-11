'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({ isOpen, onClose, onConfirm }: DeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay Escuro */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Card do Modal */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white p-6 rounded-2xl shadow-xl w-full max-w-[660px]"
          >
            <h2 className="text-xl font-bold mb-8">Are you sure you want to delete this item?</h2>
            
            <div className="flex justify-end gap-4">
              <button 
                onClick={onClose}
                className="px-8 py-1.5 border border-[#999999] rounded-lg font-bold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                className="px-8 py-1.5 bg-[#FF5151] text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
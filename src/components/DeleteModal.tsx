// DeleteModal.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
}

export function DeleteModal({ isOpen, onClose, onConfirm, itemName = 'this item' }: DeleteModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }} 
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header com gradiente de alerta */}
            <div className="bg-gradient-to-br from-[#FF5151]/10 to-[#FF5151]/5 p-6 pb-0">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 bg-gradient-to-br from-[#FF5151] to-[#e04545] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#FF5151]/30"
              >
                <AlertTriangle className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="p-6 pt-4">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-[#333333]">Delete Confirmation</h2>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-[#999999] hover:text-[#555555] transition-colors p-2 hover:bg-[#f5f5f5] rounded-full"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              <p className="text-[#777777] mb-8 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-[#333333] bg-[#f5f5f5] px-2 py-1 rounded-md">{itemName}</span>? 
                <br /><br />
                <span className="text-sm text-[#FF5151] font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  This action cannot be undone.
                </span>
              </p>
              
              <div className="flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3.5 border-2 border-[#e0e0e0] rounded-xl font-semibold text-[#555555] hover:border-[#999999] hover:bg-[#f8f9fa] transition-all duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="flex-1 px-6 py-3.5 bg-gradient-to-r from-[#FF5151] to-[#e04545] text-white rounded-xl font-semibold shadow-lg shadow-[#FF5151]/30 hover:shadow-xl hover:shadow-[#FF5151]/40 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
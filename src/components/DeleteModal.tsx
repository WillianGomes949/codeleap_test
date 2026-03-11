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
            {/* Header com lineare de alerta */}
            <div className="bg-linear-to-br from-danger/10 to-danger/5 p-6 pb-0">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 bg-linear-to-br from-danger to-danger-dark rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-danger/30"
              >
                <AlertTriangle className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="p-6 pt-4">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl font-bold text-neutral-700">Delete Confirmation</h2>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-neutral-400 hover:text-neutral-600 transition-colors p-2 hover:bg-900 rounded-full"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              <p className="text-neutral-500 mb-8 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-neutral-700 bg-neutral-100 px-2 py-1 rounded-md">{itemName}</span>? 
                <br /><br />
                <span className="text-sm text-danger font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  This action cannot be undone.
                </span>
              </p>
              
              <div className="flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-6 py-3.5 border-2 border-neutral-200 rounded-xl font-semibold text-neutral-600 hover:border-neutral-400 hover:bg-neutral-100 transition-all duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onConfirm}
                  className="flex-1 px-6 py-3.5 bg-linear-to-r from-danger to-danger-dark text-white rounded-xl font-semibold shadow-lg shadow-danger/30 hover:shadow-xl hover:shadow-danger/40 transition-all duration-200 flex items-center justify-center gap-2"
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
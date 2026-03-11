// DeleteModal.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

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
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header com ícone de alerta */}
            <div className="bg-red-50 p-6 pb-0">
              <div className="w-12 h-12 bg-[#FF5151]/10 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-[#FF5151]" />
              </div>
            </div>

            <div className="p-6 pt-4">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-gray-900">Delete Confirmation</h2>
                <button 
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-gray-900">{itemName}</span>? 
                This action cannot be undone and will permanently remove it from our servers.
              </p>
              
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={onClose}
                  className="px-6 py-2.5 border border-[#999999] rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-[#777777] transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={onConfirm}
                  className="px-6 py-2.5 bg-[#FF5151] text-white rounded-lg font-semibold hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Permanently
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { Trash2 } from 'lucide-react';
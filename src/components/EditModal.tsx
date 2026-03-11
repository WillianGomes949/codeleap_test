// EditModal.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Edit3, Type, AlignLeft, Check } from "lucide-react";

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
  initialTitle,
  initialContent,
}: EditModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isFocused, setIsFocused] = useState<"title" | "content" | null>(null);

  const safeTitle = String(title ?? "");
  const safeContent = String(content ?? "");

  const hasChanges =
    safeTitle.trim().length > 0 && safeContent.trim().length > 0;
  const titleProgress = Math.min((safeTitle.length / 100) * 100, 100);
  const contentProgress = Math.min((safeContent.length / 1000) * 100, 100);

  const handleSave = () => {
    if (hasChanges) {
      onSave(safeTitle.trim(), safeContent.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSave();
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
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-success/10 to-success/5 px-6 py-5 border-b border-success/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                  className="w-12 h-12 bg-linear-to-br from-success to-success rounded-xl flex items-center justify-center text-white shadow-lg shadow-success/30"
                >
                  <Edit3 className="w-6 h-6" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-bold text-neutral-700">
                    Edit Post
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Refine your content
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-2 hover:bg-neutral-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="p-6 space-y-6">
              {/* Title Input */}
              <motion.div
                className="space-y-2"
                animate={{ scale: isFocused === "title" ? 1.01 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center">
                  <label
                    className={`text-sm font-semibold flex items-center gap-2 transition-colors ${isFocused === "title" ? "text-success" : "text-neutral-600"}`}
                  >
                    <Type className="w-4 h-4" />
                    Title
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-linear-to-r from-success to-success-light rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${titleProgress}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-400 font-medium">
                      {safeTitle.length}/100
                    </span>
                  </div>
                </div>
                <input
                  type="text"
                  className={`w-full bg-neutral-100 border-2 rounded-xl px-4 py-3.5 outline-none transition-all duration-300 text-neutral-700 placeholder-neutral-400 font-medium
                    ${
                      isFocused === "title"
                        ? "border-success bg-white shadow-sm"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  value={safeTitle}
                  onChange={(e) => setTitle(e.target.value.slice(0, 100))}
                  onFocus={() => setIsFocused("title")}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Enter post title..."
                  autoFocus
                />
              </motion.div>

              {/* Content Input */}
              <motion.div
                className="space-y-2"
                animate={{ scale: isFocused === "content" ? 1.01 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-center">
                  <label
                    className={`text-sm font-semibold flex items-center gap-2 transition-colors ${isFocused === "content" ? "text-success" : "text-neutral-600"}`}
                  >
                    <AlignLeft className="w-4 h-4" />
                    Content
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-linear-to-r from-success to-success-light] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${contentProgress}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-400 font-medium">
                      {safeContent.length}/1000
                    </span>
                  </div>
                </div>
                <textarea
                  className={`w-full bg-neutral-100 border-2 rounded-xl px-4 py-3.5 min-h-50 outline-none transition-all duration-300 resize-y text-neutral-700 placeholder-neutral-400 font-medium leading-relaxed
                    ${
                      isFocused === "content"
                        ? "border-success bg-white shadow-sm"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
                  value={safeContent}
                  onChange={(e) => setContent(e.target.value.slice(0, 1000))}
                  onFocus={() => setIsFocused("content")}
                  onBlur={() => setIsFocused(null)}
                  placeholder="Write your content here..."
                />
                <p className="text-xs text-neutral-400 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Pro tip: Press Cmd/Ctrl + Enter to save quickly
                </p>
              </motion.div>
            </div>

            <div className="p-6 bg-linear-to-r from-neutral-100 to-neutral-100 border-t border-neutral-200 flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-6 py-3 border-2 border-neutral-200 rounded-xl font-semibold text-neutral-600 hover:border-neutral-400 hover:bg-white transition-all duration-200"
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
                  ${
                    hasChanges
                      ? "bg-linear-to-r from-success to-success text-white shadow-success/30 hover:shadow-xl hover:shadow-success/40"
                      : "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none"
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

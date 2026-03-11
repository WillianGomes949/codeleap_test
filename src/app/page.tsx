// page.tsx (Signup)
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/src/context/UserContext";
import { ArrowRight, User } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name.trim());
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-[#DDDDDD] via-[#e8e8e8] to-[#d0d0d0] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7695EC]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#47B960]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-[0_20px_60px_-15px_rgba(118,149,236,0.3)] max-w-md w-full border border-white/50"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center bg-linear-to-r from-[#7695EC] to-[#47B960] bg-clip-text text-transparent">
            Welcome!
          </h1>
          <p className="text-[#777777] text-center mb-8 text-sm">
            Join our community of developers and start sharing your ideas today.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <label className="block text-sm font-semibold text-[#555555] ml-1">
              Choose your username
            </label>
            <div
              className={`relative transition-all duration-300 ${isFocused ? "transform scale-[1.02]" : ""}`}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="johndoe"
                className="w-full bg-[#f8f9fa] border-2 border-[#e0e0e0] rounded-xl pl-12 pr-4 py-4 outline-none transition-all duration-200 text-[#333333] placeholder-[#999999] font-medium
                  focus:border-[#7695EC] focus:bg-white focus:shadow-[0_0_0_4px_rgba(118,149,236,0.1)] hover:border-[#cccccc]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={20}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#999999] font-medium">
                {name.length}/20
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              type="submit"
              disabled={!name.trim()}
              whileHover={name.trim() ? { scale: 1.02, y: -2 } : {}}
              whileTap={name.trim() ? { scale: 0.98 } : {}}
              className={`w-full group relative overflow-hidden rounded-xl py-4 font-bold text-lg tracking-wide transition-all duration-300
                ${
                  name.trim()
                    ? "bg-linear-to-r from-[#7695EC] to-[#5a7bd4] text-white shadow-lg shadow-[#7695EC]/40 hover:shadow-xl hover:shadow-[#7695EC]/50"
                    : "bg-[#e0e0e0] text-[#999999] cursor-not-allowed"
                }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Enter Platform
                <ArrowRight
                  className={`w-5 h-5 transition-transform duration-300 ${name.trim() ? "group-hover:translate-x-1" : ""}`}
                />
              </span>
              {name.trim() && (
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-[#5a7bd4] to-[#7695EC]"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          </motion.div>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-[#999999] mt-6"
        >
          By entering, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </motion.div>
    </main>
  );
}

'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@/src/context/UserContext';

export default function Signup() {
  const [name, setName] = useState('');
  const { login } = useUser();
  

  return (
    <main className="fixed inset-0 bg-[#DDDDDD] flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl shadow-sm max-w-125 w-full border border-[#CCCCCC]"
      >
        <h1 className="text-xl font-bold mb-6 text-black">Welcome to CodeLeap network!</h1>
        
        <label className="block mb-2 text-black">Please enter your username</label>
        <input 
          type="text"
          placeholder="John Doe"
          className="w-full border border-[#777777] rounded-lg p-2 mb-4 outline-none focus:ring-1 focus:ring-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            onClick={() => login(name)}
            disabled={!name.trim()}
            className="bg-[#7695EC] text-white px-8 py-1.5 rounded-lg font-bold uppercase tracking-wider disabled:bg-gray-300 transition-colors"
          >
            Enter
          </button>
        </div>
      </motion.div>
    </main>
  );
}
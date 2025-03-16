'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto p-6 bg-black shadow-lg rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-center text-white mb-4">Kontak Kami</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white">Nama</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 bg-gray-800 text-white" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 bg-gray-800 text-white" 
            required 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Pesan</label>
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 bg-gray-800 text-white" 
            required 
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Kirim
        </button>
      </form>
    </motion.div>
  );
}
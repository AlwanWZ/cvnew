'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const sections = ['Beranda', 'Tentang', 'Skills', 'Portfolio'];

export default function CvScroll() {
  const [activeSection, setActiveSection] = useState<string>('Beranda');
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div className="min-h-screen bg-gray-900 text-white">
      <motion.nav
        className={`fixed top-0 left-0 right-0 p-4 z-50 flex justify-center space-x-6 transition-all duration-300 ${
          isScrolled ? 'bg-gray-800/80 backdrop-blur-md shadow-md' : 'bg-gray-800'
        }`}
        animate={{ scale: isScrolled ? 0.95 : 1, opacity: isScrolled ? 0.9 : 1 }}
      >
        {sections.map((section) => (
          <motion.button
            key={section}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeSection === section ? 'bg-blue-500 scale-105' : 'hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleScrollToSection(section)}
          >
            {section}
          </motion.button>
        ))}
      </motion.nav>

      {sections.map((section) => (
        <motion.section
          key={section}
          id={section}
          className="h-screen flex flex-col items-center justify-center text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.2 }}
        >
          {section === 'Portfolio' && (
            <>
              <h2 className="text-4xl font-bold mb-6">Portfolio Saya</h2>
              <p className="text-lg opacity-80 mb-10">Berikut adalah beberapa proyek yang telah saya kerjakan dalam pengembangan website dan aplikasi.</p>
              {[
                {
                  title: 'Loopify',
                  desc: 'Platform media sosial berbasis web yang memungkinkan pengguna untuk berbagi konten dan berinteraksi dalam komunitas yang dinamis.',
                  img: '/loopify.png'
                },
                {
                  title: 'Anzz',
                  desc: 'E-Commerce khusus untuk sepeda fixie dengan fitur unggulan seperti pemesanan custom dan komunitas pengendara.',
                  img: '/anzz.png'
                },
                {
                  title: 'PMB',
                  desc: 'Website Penerimaan Mahasiswa Baru yang dirancang untuk mempermudah proses pendaftaran dan seleksi secara digital.',
                  img: '/pmb.png'
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  className="cursor-pointer flex flex-col items-center mb-10 p-6 bg-gray-800 rounded-xl shadow-lg w-full md:w-2/3 lg:w-1/2"
                >
                  <motion.div
                    whileInView={{ scale: 1.1, opacity: 1 }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    viewport={{ once: false, amount: 0.3 }}
                    whileHover={{ scale: 1.15 }}
                    className="overflow-hidden rounded-xl"
                  >
                    <Image
                      src={project.img}
                      alt={project.title}
                      width={500}
                      height={300}
                      className="rounded-xl transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mt-4 mb-2 text-blue-400">{project.title}</h3>
                  <p className="text-sm opacity-80 px-6">{project.desc}</p>
                </motion.div>
              ))}
            </>
          )}
        </motion.section>
      ))}
    </motion.div>
  );
}

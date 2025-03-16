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
      {/* Sticky Navigation dengan Blur Effect */}
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

      {sections.map((section, index) => (
        <motion.section
          key={section}
          id={section}
          className="h-screen flex flex-col items-center justify-center text-center px-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.div
            className="bg-gray-800 p-6 rounded-xl shadow-lg w-3/4 md:w-1/2 flex flex-col items-center justify-center text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {section === 'Beranda' && (
              <>
                <h1 className="text-5xl font-extrabold tracking-wide">Alwan's Portfolio</h1>
                <p className="text-lg mt-2 opacity-80">Mahasiswa Sistem Informasi A - Semester 4</p>
                <motion.div
                  className="flex justify-center items-center mt-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="rounded-full border-4 border-blue-500 shadow-lg"
                  />
                </motion.div>
              </>
            )}
            {section === 'Tentang' && (
              <>
                <h2 className="text-4xl font-bold mb-4">Tentang Saya</h2>
                <motion.p
                  className="max-w-2xl text-lg opacity-80"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Nama saya Alwan, lahir di Lampung pada 6 November 2005. Saya seorang mahasiswa semester 4 di Program Studi Sistem Informasi A. Hobi saya meliputi bermain basket, membaca komik, menonton anime, riding, dan bermain game.
                </motion.p>
              </>
            )}
            {section === 'Skills' && (
              <>
                <h2 className="text-4xl font-bold mb-6">Skills</h2>
                <div className="w-full max-w-xl">
                  {[
                    { skill: 'HTML', level: 90 },
                    { skill: 'PHP', level: 89 },
                    { skill: 'CSS', level: 50 },
                    { skill: 'JavaScript', level: 50 },
                    { skill: 'React', level: 50 },
                  ].map((item, index) => (
                    <motion.div key={index} className="mb-3">
                      <p className="text-sm font-medium">{item.skill}</p>
                      <motion.div
                        className="bg-blue-600 h-6 rounded-full overflow-hidden relative"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ duration: 1 }}
                      >
                        <motion.span
                          className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-sm"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          {item.level}%
                        </motion.span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
            {section === 'Portfolio' && (
              <>
                <h2 className="text-4xl font-bold mb-6">Portfolio</h2>
                <motion.div
                  className="cursor-pointer flex flex-col items-center"
                  whileHover={{ rotate: -5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold">Loopify</h3>
                  <p className="text-sm opacity-80">Web Medsos menggunakan PHP</p>
                  <motion.div
                    className="mt-4 flex justify-center items-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/loopify.png"
                      alt="Loopify Project"
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                  </motion.div>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.section>
      ))}
    </motion.div>
  );
}
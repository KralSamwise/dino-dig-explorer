'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-black text-jungle-700 mb-4 drop-shadow-lg">
          🦖 DINO DIG EXPLORER 🦕
        </h1>
        <p className="text-2xl md:text-3xl text-earth-600 font-bold">
          Discover Amazing Dinosaurs! ✨
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="/explore">
            <div className="btn-primary text-center cursor-pointer h-32 flex flex-col items-center justify-center space-y-2">
              <span className="text-5xl">🔍</span>
              <span>Explore Dinos</span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/collection">
            <div className="btn-secondary text-center cursor-pointer h-32 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-purple-500 to-purple-600">
              <span className="text-5xl">🥚</span>
              <span>My Collection</span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link href="/explore">
            <div className="btn-primary text-center cursor-pointer h-32 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-amber-500 to-orange-600">
              <span className="text-5xl">🎯</span>
              <span>Quiz Time!</span>
            </div>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-xl text-earth-600">
          Learn about 7 awesome dinosaurs! 🌟
        </p>
      </motion.div>
    </div>
  )
}

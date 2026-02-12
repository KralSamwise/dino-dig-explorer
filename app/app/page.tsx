'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dinosaurs from '@/data/dinosaurs.json'
import { sounds } from '@/lib/sounds'
import { isCollected } from '@/lib/collection'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Dino of the Day — deterministic based on date
  const dinoOfDay = useMemo(() => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
    return dinosaurs[dayOfYear % dinosaurs.length]
  }, [])

  const isDoTDCollected = mounted && isCollected(dinoOfDay.id)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl md:text-7xl font-black text-jungle-700 mb-4 drop-shadow-lg">
          🦖 DINO DIG EXPLORER 🦕
        </h1>
        <p className="text-2xl md:text-3xl text-earth-600 font-bold">
          Discover Amazing Dinosaurs! ✨
        </p>
      </motion.div>

      {/* Main Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="/explore">
            <div className="btn-primary text-center cursor-pointer h-32 flex flex-col items-center justify-center space-y-2" onClick={() => sounds.click()}>
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
            <div className="btn-secondary text-center cursor-pointer h-32 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-purple-500 to-purple-600" onClick={() => sounds.click()}>
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
          <Link href="/quiz">
            <div className="btn-primary text-center cursor-pointer h-32 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-amber-500 to-orange-600" onClick={() => sounds.click()}>
              <span className="text-5xl">🎯</span>
              <span>Quiz Time!</span>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Secondary Buttons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex gap-4 mb-8"
      >
        <Link href="/achievements">
          <div className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all cursor-pointer text-lg" onClick={() => sounds.click()}>
            🏅 Achievements
          </div>
        </Link>
      </motion.div>

      {/* Dino of the Day */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link href={`/explore/${dinoOfDay.id}`}>
          <div className="bg-white rounded-3xl shadow-xl p-6 cursor-pointer hover:scale-105 transition-all" onClick={() => { sounds.click(); sounds.roar() }}>
            <div className="text-center">
              <p className="text-sm font-bold text-amber-600 uppercase tracking-wide mb-1">⭐ Dino of the Day</p>
              <div className="text-6xl mb-3">{dinoOfDay.emoji}</div>
              <h3 className="text-2xl font-black" style={{ color: dinoOfDay.color }}>
                {dinoOfDay.name}
              </h3>
              <p className="text-earth-600 mt-2">{dinoOfDay.funFact}</p>
              {isDoTDCollected ? (
                <span className="inline-block mt-3 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                  ✅ In your collection
                </span>
              ) : (
                <span className="inline-block mt-3 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">
                  🥚 Not collected yet — take the quiz!
                </span>
              )}
            </div>
          </div>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-xl text-earth-600">
          Learn about {dinosaurs.length} awesome dinosaurs! 🌟
        </p>
      </motion.div>
    </div>
  )
}

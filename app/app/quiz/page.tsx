'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dinosaurs from '@/data/dinosaurs.json'
import { isCollected } from '@/lib/collection'
import { sounds } from '@/lib/sounds'

type Difficulty = 'easy' | 'medium' | 'hard'

export default function QuizSelectPage() {
  const [mounted, setMounted] = useState(false)
  const [collectedIds, setCollectedIds] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<Difficulty>('medium')

  useEffect(() => {
    setMounted(true)
    setCollectedIds(dinosaurs.filter(d => isCollected(d.id)).map(d => d.id))
  }, [])

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/">
            <button className="mb-4 text-4xl hover:scale-110 transition-transform">
              ⬅️
            </button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-amber-600 mb-2">
            🎯 Quiz Time!
          </h1>
          <p className="text-xl text-earth-600 mb-6">
            Pick a dinosaur and test your knowledge!
          </p>

          {/* Difficulty Selector */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 max-w-lg mx-auto">
            <h2 className="text-2xl font-black text-jungle-700 mb-4">Choose Difficulty:</h2>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setDifficulty('easy'); sounds.click() }}
                className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
                  difficulty === 'easy'
                    ? 'bg-green-500 text-white scale-110 shadow-lg'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                🌱 Easy
                <span className="block text-xs mt-1">3 questions</span>
              </button>
              <button
                onClick={() => { setDifficulty('medium'); sounds.click() }}
                className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
                  difficulty === 'medium'
                    ? 'bg-amber-500 text-white scale-110 shadow-lg'
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                ⭐ Medium
                <span className="block text-xs mt-1">5 questions</span>
              </button>
              <button
                onClick={() => { setDifficulty('hard'); sounds.click() }}
                className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
                  difficulty === 'hard'
                    ? 'bg-red-500 text-white scale-110 shadow-lg'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                🔥 Hard
                <span className="block text-xs mt-1">5 + timer!</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dinosaurs.map((dino, index) => {
            const collected = mounted && collectedIds.includes(dino.id)
            return (
              <motion.div
                key={dino.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link href={`/quiz/${dino.id}?difficulty=${difficulty}`}>
                  <div className="card cursor-pointer text-center" onClick={() => sounds.click()}>
                    <div
                      className="text-7xl mb-4 py-4 rounded-2xl"
                      style={{ backgroundColor: `${dino.color}20` }}
                    >
                      {dino.emoji}
                    </div>
                    <h3 className="text-xl font-black text-jungle-800 mb-2">
                      {dino.name}
                    </h3>
                    {collected ? (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                        ✅ Collected
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">
                        🥚 Not hatched yet
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

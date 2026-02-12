'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dinosaurs from '@/data/dinosaurs.json'
import { getCollection, getCollectionProgress } from '@/lib/collection'
import { sounds } from '@/lib/sounds'

export default function CollectionPage() {
  const [collection, setCollection] = useState<string[]>([])
  const [progress, setProgress] = useState({ collected: 0, total: 7 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCollection(getCollection().collected)
    setProgress(getCollectionProgress())
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-bounce">🥚</div>
      </div>
    )
  }

  const percentage = Math.round((progress.collected / progress.total) * 100)

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <button className="mb-4 text-4xl hover:scale-110 transition-transform">
              ⬅️
            </button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-purple-700 mb-4">
            🥚 My Dino Collection
          </h1>
          <p className="text-2xl text-earth-600">
            Collect all {progress.total} dinosaurs!
          </p>
        </div>

        {/* Progress Card */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="card mb-8 bg-gradient-to-r from-purple-50 to-pink-50"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-black text-purple-700">
              Progress: {progress.collected}/{progress.total}
            </h2>
            <div className="text-4xl">
              {percentage === 100 ? '🏆' : '🥚'}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full flex items-center justify-center text-white font-bold"
            >
              {percentage}%
            </motion.div>
          </div>

          {percentage === 100 && (
            <motion.p
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, type: 'spring' }}
              className="text-2xl font-bold text-purple-700 mt-4 text-center"
            >
              🎉 You collected them all! You&apos;re a Dino Expert! 🎉
            </motion.p>
          )}
        </motion.div>

        {/* Share Button */}
        {progress.collected > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <button
              onClick={() => {
                sounds.click()
                const collectedNames = dinosaurs
                  .filter(d => collection.includes(d.id))
                  .map(d => `${d.emoji} ${d.name}`)
                  .join('\n')
                const text = `🦖 My Dino Dig Collection!\n\n${collectedNames}\n\n${progress.collected}/${progress.total} dinosaurs collected!\n\nPlay at: https://app-two-gray-53.vercel.app`
                if (navigator.share) {
                  navigator.share({ title: 'My Dino Collection!', text })
                } else {
                  navigator.clipboard.writeText(text)
                  alert('Copied to clipboard! 📋')
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-2xl shadow-lg hover:scale-105 transition-all text-lg"
            >
              📤 Share My Collection!
            </button>
          </motion.div>
        )}

        {/* Collection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dinosaurs.map((dino, index) => {
            const isCollected = collection.includes(dino.id)

            return (
              <motion.div
                key={dino.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Link href={isCollected ? `/explore/${dino.id}` : `/quiz/${dino.id}`}>
                  <div
                    className={`card cursor-pointer h-full ${
                      isCollected ? 'bg-white' : 'bg-gray-100'
                    }`}
                  >
                    {/* Dino Visual */}
                    <div
                      className={`h-32 flex items-center justify-center text-6xl mb-4 rounded-2xl ${
                        isCollected ? '' : 'grayscale opacity-30'
                      }`}
                      style={{
                        backgroundColor: isCollected ? `${dino.color}20` : '#e5e7eb',
                      }}
                    >
                      {isCollected ? dino.emoji : '🥚'}
                    </div>

                    {/* Dino Name */}
                    <h3
                      className={`text-lg font-black text-center mb-2 ${
                        isCollected ? 'text-jungle-800' : 'text-gray-400'
                      }`}
                    >
                      {isCollected ? dino.name : '???'}
                    </h3>

                    {/* Status */}
                    {isCollected ? (
                      <div className="text-center">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                          ✓ Collected
                        </span>
                      </div>
                    ) : (
                      <div className="text-center">
                        <span className="inline-block px-3 py-1 bg-gray-200 text-gray-500 rounded-full text-sm font-bold">
                          🔒 Locked
                        </span>
                        <p className="text-xs text-gray-500 mt-2">
                          Complete quiz to unlock
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Helpful Message */}
        {progress.collected < progress.total && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <p className="text-xl text-earth-600 mb-4">
              🎯 Complete quizzes to hatch more dinosaurs!
            </p>
            <Link href="/explore">
              <button className="btn-primary">
                Explore More Dinos
              </button>
            </Link>
          </motion.div>
        )}

        {progress.collected === progress.total && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
            className="text-center mt-12"
          >
            <div className="text-8xl mb-4">🏆</div>
            <p className="text-3xl font-black text-purple-700 mb-4">
              Congratulations, Dino Master!
            </p>
            <p className="text-xl text-earth-600">
              You&apos;ve learned about all the dinosaurs! 🎓
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

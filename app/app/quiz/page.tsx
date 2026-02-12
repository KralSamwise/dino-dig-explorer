'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dinosaurs from '@/data/dinosaurs.json'
import { isCollected } from '@/lib/collection'

export default function QuizSelectPage() {
  const [mounted, setMounted] = useState(false)
  const [collectedIds, setCollectedIds] = useState<string[]>([])

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
          <p className="text-xl text-earth-600">
            Pick a dinosaur to quiz yourself on!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dinosaurs.map((dino, index) => {
            const collected = mounted && collectedIds.includes(dino.id)
            return (
              <motion.div
                key={dino.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
              >
                <Link href={`/quiz/${dino.id}`}>
                  <div className="card cursor-pointer text-center">
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

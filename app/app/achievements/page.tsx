'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { achievements, getAchievementState, type AchievementState } from '@/lib/achievements'

export default function AchievementsPage() {
  const [mounted, setMounted] = useState(false)
  const [state, setState] = useState<AchievementState>({ collected: [], perfectQuizzes: [], totalQuizzesTaken: 0 })

  useEffect(() => {
    setMounted(true)
    setState(getAchievementState())
  }, [])

  const unlockedCount = mounted ? achievements.filter(a => a.condition(state)).length : 0

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/">
            <button className="mb-4 text-4xl hover:scale-110 transition-transform">
              ⬅️
            </button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-amber-600 mb-2">
            🏅 Achievements
          </h1>
          <p className="text-xl text-earth-600">
            {unlockedCount}/{achievements.length} unlocked
          </p>
        </div>

        {/* Progress */}
        <div className="card mb-8 bg-gradient-to-r from-amber-50 to-yellow-50">
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: mounted ? `${(unlockedCount / achievements.length) * 100}%` : '0%' }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-gradient-to-r from-amber-400 to-yellow-500 h-full rounded-full flex items-center justify-center text-white font-bold text-sm"
            >
              {mounted ? Math.round((unlockedCount / achievements.length) * 100) : 0}%
            </motion.div>
          </div>
          <div className="flex justify-between mt-3 text-sm text-earth-600">
            <span>🦕 {state.collected.length} dinos collected</span>
            <span>🧠 {state.perfectQuizzes.length} perfect quizzes</span>
            <span>📝 {state.totalQuizzesTaken} quizzes taken</span>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const unlocked = mounted && achievement.condition(state)
            return (
              <motion.div
                key={achievement.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className={`card ${unlocked ? 'bg-gradient-to-r from-amber-50 to-yellow-50' : 'bg-gray-50 opacity-60'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-5xl ${unlocked ? '' : 'grayscale'}`}>
                    {unlocked ? achievement.icon : '🔒'}
                  </div>
                  <div>
                    <h3 className={`text-xl font-black ${unlocked ? 'text-amber-800' : 'text-gray-400'}`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm ${unlocked ? 'text-amber-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </p>
                    {unlocked && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        ✅ Unlocked!
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

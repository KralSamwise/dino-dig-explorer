'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import dinosaurs from '@/data/dinosaurs.json'
import DinoCard from '@/components/DinoCard'
import { sounds } from '@/lib/sounds'

type Era = 'All' | 'Triassic' | 'Jurassic' | 'Cretaceous'
type Diet = 'All' | 'Carnivore' | 'Herbivore'

export default function ExplorePage() {
  const [eraFilter, setEraFilter] = useState<Era>('All')
  const [dietFilter, setDietFilter] = useState<Diet>('All')

  const filteredDinos = dinosaurs.filter(dino => {
    const matchesEra = eraFilter === 'All' || dino.era === eraFilter
    const matchesDiet = dietFilter === 'All' || dino.diet === dietFilter
    return matchesEra && matchesDiet
  })

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <button className="mb-4 text-4xl hover:scale-110 transition-transform">
              ⬅️
            </button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-jungle-700 mb-2">
            🔍 Explore Dinosaurs
          </h1>
          <p className="text-xl text-earth-600">
            Tap a dino to learn more! 🦖
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Era Filter */}
            <div>
              <label className="block text-2xl font-bold text-jungle-700 mb-3">
                🌍 Time Period:
              </label>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Triassic', 'Jurassic', 'Cretaceous'] as Era[]).map(era => (
                  <button
                    key={era}
                    onClick={() => setEraFilter(era)}
                    className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
                      eraFilter === era
                        ? 'bg-jungle-500 text-white scale-110 shadow-lg'
                        : 'bg-jungle-100 text-jungle-700 hover:bg-jungle-200'
                    }`}
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>

            {/* Diet Filter */}
            <div>
              <label className="block text-2xl font-bold text-jungle-700 mb-3">
                🍖 Diet:
              </label>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Carnivore', 'Herbivore'] as Diet[]).map(diet => (
                  <button
                    key={diet}
                    onClick={() => setDietFilter(diet)}
                    className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
                      dietFilter === diet
                        ? 'bg-earth-500 text-white scale-110 shadow-lg'
                        : 'bg-earth-100 text-earth-700 hover:bg-earth-200'
                    }`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dinosaur Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDinos.map((dino, index) => (
            <motion.div
              key={dino.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link href={`/explore/${dino.id}`} onClick={() => sounds.click()}>
                <DinoCard dino={dino} />
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredDinos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-3xl">😢 No dinosaurs found!</p>
            <p className="text-xl text-earth-600 mt-2">Try different filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

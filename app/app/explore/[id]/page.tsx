'use client'

import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import dinosaurs from '@/data/dinosaurs.json'

// Dynamically import 3D component to avoid SSR issues
const DinoModel = dynamic(() => import('@/components/DinoModel'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] md:h-[500px] rounded-3xl bg-gradient-to-b from-sky-200 to-jungle-100 flex items-center justify-center">
      <div className="text-6xl animate-bounce">🦴</div>
    </div>
  ),
})

export default function DinoDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dinoId = params.id as string

  const dino = dinosaurs.find(d => d.id === dinoId)

  if (!dino) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😢 Dino not found!</p>
          <button
            onClick={() => router.push('/explore')}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push('/explore')}
          className="mb-6 text-4xl hover:scale-110 transition-transform"
        >
          ⬅️
        </button>

        {/* Title */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-2" style={{ color: dino.color }}>
            {dino.emoji} {dino.name}
          </h1>
          <p className="text-xl md:text-2xl text-earth-600 italic">
            ({dino.pronunciation})
          </p>
        </motion.div>

        {/* 3D Model Viewer */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <DinoModel dinoId={dino.id} />
          <p className="text-center mt-4 text-earth-600 text-lg">
            👆 Drag to rotate • Pinch to zoom • Swipe to explore!
          </p>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Stats Card */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h2 className="text-3xl font-black text-jungle-700 mb-4">
              📊 Dino Stats
            </h2>
            <div className="space-y-3">
              <div>
                <span className="font-bold text-lg">🕰️ Era:</span>
                <span className="ml-2 text-lg">{dino.era}</span>
              </div>
              <div>
                <span className="font-bold text-lg">🍖 Diet:</span>
                <span className="ml-2 text-lg">{dino.diet}</span>
              </div>
              <div>
                <span className="font-bold text-lg">📏 Length:</span>
                <span className="ml-2 text-lg">{dino.length}</span>
              </div>
              {'height' in dino && (
                <div>
                  <span className="font-bold text-lg">📐 Height:</span>
                  <span className="ml-2 text-lg">{dino.height}</span>
                </div>
              )}
              {'wingspan' in dino && (
                <div>
                  <span className="font-bold text-lg">🦅 Wingspan:</span>
                  <span className="ml-2 text-lg">{dino.wingspan}</span>
                </div>
              )}
              <div>
                <span className="font-bold text-lg">⚖️ Weight:</span>
                <span className="ml-2 text-lg">{dino.weight}</span>
              </div>
            </div>
          </motion.div>

          {/* Fun Fact Card */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="card"
            style={{ backgroundColor: `${dino.color}10` }}
          >
            <h2 className="text-3xl font-black text-jungle-700 mb-4">
              ⭐ Super Cool Fact!
            </h2>
            <p className="text-2xl font-bold mb-6" style={{ color: dino.color }}>
              {dino.funFact}
            </p>
            <div className="text-6xl text-center">
              {dino.emoji}
            </div>
          </motion.div>
        </div>

        {/* Facts List */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="card mb-8"
        >
          <h2 className="text-3xl font-black text-jungle-700 mb-4">
            🎓 Amazing Facts
          </h2>
          <ul className="space-y-3">
            {dino.facts.map((fact, index) => (
              <motion.li
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start gap-3 text-lg"
              >
                <span className="text-2xl flex-shrink-0">✨</span>
                <span>{fact}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Quiz Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          className="text-center"
        >
          <button
            onClick={() => router.push(`/quiz/${dino.id}`)}
            className="btn-primary text-2xl py-6 px-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
          >
            🎯 Take the Quiz!
          </button>
          <p className="text-earth-600 mt-4 text-lg">
            Complete the quiz to add {dino.name} to your collection! 🥚
          </p>
        </motion.div>
      </div>
    </div>
  )
}

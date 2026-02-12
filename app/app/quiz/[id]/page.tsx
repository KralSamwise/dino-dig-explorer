'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import dinosaurs from '@/data/dinosaurs.json'
import { addToCollection, isCollected } from '@/lib/collection'

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const dinoId = params.id as string

  const dino = dinosaurs.find(d => d.id === dinoId)
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [alreadyCollected, setAlreadyCollected] = useState(false)

  useEffect(() => {
    if (dino) {
      setAlreadyCollected(isCollected(dino.id))
    }
  }, [dino])

  if (!dino) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😢 Dino not found!</p>
          <button onClick={() => router.push('/explore')} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const question = dino.quiz[currentQuestion]
  const isCorrect = selectedAnswer === question.correct

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === question.correct) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < dino.quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizComplete(true)
        if (score + (answerIndex === question.correct ? 1 : 0) >= 2) {
          addToCollection(dino.id)
        }
      }
    }, 2000)
  }

  if (quizComplete) {
    const passed = score >= 2
    const finalScore = score + (isCorrect ? 1 : 0)

    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="card text-center max-w-2xl"
        >
          <div className="text-8xl mb-6">
            {passed ? '🎉' : '😢'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: dino.color }}>
            {passed ? 'Amazing Job!' : 'Keep Learning!'}
          </h1>
          <p className="text-3xl mb-6">
            You scored {finalScore} out of {dino.quiz.length}!
          </p>
          
          {passed && !alreadyCollected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="mb-6"
            >
              <div className="text-7xl mb-4 animate-bounce">🥚→{dino.emoji}</div>
              <p className="text-2xl font-bold text-jungle-700">
                {dino.name} hatched and joined your collection! 🎊
              </p>
            </motion.div>
          )}

          {passed && alreadyCollected && (
            <p className="text-xl text-earth-600 mb-6">
              You already have {dino.name} in your collection! ✨
            </p>
          )}

          {!passed && (
            <p className="text-xl text-earth-600 mb-6">
              Learn more about {dino.name} and try again! 💪
            </p>
          )}

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => router.push(`/explore/${dino.id}`)}
              className="btn-secondary"
            >
              Learn More
            </button>
            {passed && (
              <button
                onClick={() => router.push('/collection')}
                className="btn-primary"
              >
                View Collection
              </button>
            )}
            {!passed && (
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Try Again
              </button>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => router.push(`/explore/${dino.id}`)}
            className="mb-4 text-4xl hover:scale-110 transition-transform"
          >
            ⬅️
          </button>
          <h1 className="text-3xl md:text-5xl font-black mb-2" style={{ color: dino.color }}>
            {dino.emoji} {dino.name} Quiz!
          </h1>
          <div className="flex justify-center gap-4 mt-4">
            <span className="text-2xl font-bold">
              Question {currentQuestion + 1}/{dino.quiz.length}
            </span>
            <span className="text-2xl font-bold">
              Score: {score} 🌟
            </span>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="card mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-jungle-800 mb-6 text-center">
              {question.question}
            </h2>

            <div className="space-y-4">
              {question.options.map((option, index) => {
                let bgColor = 'bg-white hover:bg-jungle-50'
                let borderColor = 'border-jungle-200'

                if (showResult) {
                  if (index === question.correct) {
                    bgColor = 'bg-green-100 border-green-500'
                  } else if (index === selectedAnswer) {
                    bgColor = 'bg-red-100 border-red-500'
                  }
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                    onClick={() => !showResult && handleAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-6 rounded-2xl border-4 ${borderColor} ${bgColor} text-left text-xl font-bold transition-all shadow-md`}
                  >
                    <span className="text-2xl mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                    {showResult && index === question.correct && (
                      <span className="float-right text-3xl">✅</span>
                    )}
                    {showResult && index === selectedAnswer && index !== question.correct && (
                      <span className="float-right text-3xl">❌</span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Result Feedback */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-center"
            >
              <div className="text-8xl mb-4">
                {isCorrect ? '🎉' : '💪'}
              </div>
              <p className="text-3xl font-bold">
                {isCorrect ? 'Awesome!' : 'Keep trying!'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

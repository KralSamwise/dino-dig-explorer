'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dinosaurs from '@/data/dinosaurs.json'
import { addToCollection, isCollected } from '@/lib/collection'
import { sounds } from '@/lib/sounds'
import { getAchievementState, updateAchievementState, getNewAchievements, type Achievement } from '@/lib/achievements'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface ShuffledQuestion {
  question: string
  options: string[]
  correctIndex: number // index in shuffled options
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const dinoId = params.id as string
  const difficulty = (searchParams.get('difficulty') || 'medium') as 'easy' | 'medium' | 'hard'

  const dino = dinosaurs.find(d => d.id === dinoId)
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [alreadyCollected, setAlreadyCollected] = useState(false)
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([])
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  // Shuffle and select questions based on difficulty
  const questions: ShuffledQuestion[] = useMemo(() => {
    if (!dino) return []
    const allQuestions = shuffleArray(dino.quiz)
    const count = difficulty === 'easy' ? 3 : difficulty === 'hard' ? 5 : 5
    const selected = allQuestions.slice(0, count)
    
    return selected.map(q => {
      // Create array of [option, isCorrect] pairs, shuffle, find new correct index
      const pairs = q.options.map((opt, i) => ({ opt, isCorrect: i === q.correct }))
      const shuffledPairs = shuffleArray(pairs)
      return {
        question: q.question,
        options: shuffledPairs.map(p => p.opt),
        correctIndex: shuffledPairs.findIndex(p => p.isCorrect),
      }
    })
  }, [dino, difficulty])

  // Hard mode timer
  useEffect(() => {
    if (difficulty !== 'hard' || quizComplete || showResult) return
    setTimeLeft(15)
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer)
          // Auto-wrong on timeout
          if (!showResult) {
            handleAnswer(-1) // timeout
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [currentQuestion, difficulty, quizComplete])

  useEffect(() => {
    if (dino) {
      setAlreadyCollected(isCollected(dino.id))
    }
  }, [dino])

  if (!dino || questions.length === 0) {
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

  const question = questions[currentQuestion]
  const isCorrect = selectedAnswer === question.correctIndex

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const wasCorrect = answerIndex === question.correctIndex
    const newCorrectCount = wasCorrect ? correctCount + 1 : correctCount
    if (wasCorrect) {
      setCorrectCount(newCorrectCount)
      sounds.correct()
    } else {
      sounds.wrong()
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Quiz complete
        const prevState = getAchievementState()
        const passed = newCorrectCount >= Math.ceil(questions.length * 0.6)
        
        if (passed) {
          addToCollection(dino.id)
          sounds.crack()
          setTimeout(() => sounds.hatch(), 300)
          
          // Fire confetti
          import('canvas-confetti').then(({ default: confetti }) => {
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
            })
          })
        }

        // Update achievement state
        const newState = updateAchievementState({
          collected: [...new Set([...prevState.collected, ...(passed ? [dino.id] : [])])],
          perfectQuizzes: newCorrectCount === questions.length 
            ? [...new Set([...prevState.perfectQuizzes, dino.id])]
            : prevState.perfectQuizzes,
          totalQuizzesTaken: prevState.totalQuizzesTaken + 1,
        })

        const earned = getNewAchievements(prevState, newState)
        if (earned.length > 0) {
          setTimeout(() => {
            sounds.achievement()
            setNewAchievements(earned)
          }, 1500)
        }

        setQuizComplete(true)
      }
    }, 3500)
  }

  if (quizComplete) {
    const passed = correctCount >= Math.ceil(questions.length * 0.6)

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
            {passed ? (correctCount === questions.length ? 'PERFECT SCORE!' : 'Amazing Job!') : 'Keep Learning!'}
          </h1>
          <p className="text-3xl mb-6">
            You scored {correctCount} out of {questions.length}!
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
              You need {Math.ceil(questions.length * 0.6)} correct answers to hatch {dino.name}. Learn more and try again! 💪
            </p>
          )}

          {/* New Achievements */}
          <AnimatePresence>
            {newAchievements.length > 0 && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-4"
              >
                <h3 className="text-xl font-black text-amber-700 mb-3">🏅 Achievement Unlocked!</h3>
                {newAchievements.map(a => (
                  <div key={a.id} className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{a.icon}</span>
                    <div className="text-left">
                      <p className="font-bold text-amber-800">{a.name}</p>
                      <p className="text-sm text-amber-600">{a.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/">
              <button className="btn-secondary bg-gradient-to-r from-gray-400 to-gray-500">
                🏠 Home
              </button>
            </Link>
            <button
              onClick={() => router.push(`/explore/${dino.id}`)}
              className="btn-secondary"
            >
              📖 Learn More
            </button>
            {passed && (
              <button
                onClick={() => router.push('/collection')}
                className="btn-primary"
              >
                🥚 View Collection
              </button>
            )}
            {!passed && (
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                🔄 Try Again
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
          <div className="flex justify-center gap-4 mt-4 items-center">
            <span className="text-2xl font-bold">
              Question {currentQuestion + 1}/{questions.length}
            </span>
            <span className="text-2xl font-bold">
              Score: {correctCount} 🌟
            </span>
            {difficulty === 'hard' && timeLeft !== null && (
              <span className={`text-2xl font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-earth-600'}`}>
                ⏱️ {timeLeft}s
              </span>
            )}
          </div>
          {/* Difficulty badge */}
          <div className="mt-2">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              difficulty === 'hard' ? 'bg-red-100 text-red-700' :
              'bg-amber-100 text-amber-700'
            }`}>
              {difficulty === 'easy' ? '🌱 Easy' : difficulty === 'hard' ? '🔥 Hard' : '⭐ Medium'}
            </span>
          </div>
          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-3">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all ${
                  i < currentQuestion ? 'bg-jungle-500' :
                  i === currentQuestion ? 'bg-amber-500 scale-125' :
                  'bg-gray-300'
                }`}
              />
            ))}
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
                  if (index === question.correctIndex) {
                    bgColor = 'bg-green-100'
                    borderColor = 'border-green-500'
                  } else if (index === selectedAnswer) {
                    bgColor = 'bg-red-100'
                    borderColor = 'border-red-500'
                  }
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                    onClick={() => {
                      sounds.click()
                      handleAnswer(index)
                    }}
                    disabled={showResult}
                    className={`w-full p-6 rounded-2xl border-4 ${borderColor} ${bgColor} text-left text-xl font-bold transition-all shadow-md`}
                  >
                    <span className="text-2xl mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                    {showResult && index === question.correctIndex && (
                      <span className="float-right text-3xl">✅</span>
                    )}
                    {showResult && index === selectedAnswer && index !== question.correctIndex && (
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
                {isCorrect ? '🎉' : '🤔'}
              </div>
              <p className="text-3xl font-bold mb-2">
                {isCorrect ? 'Awesome!' : 'Not quite!'}
              </p>
              <p className="text-lg text-earth-600">
                The answer is: <strong>{question.options[question.correctIndex]}</strong>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

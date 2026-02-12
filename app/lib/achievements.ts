import dinosaurs from '@/data/dinosaurs.json'

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  condition: (state: AchievementState) => boolean
}

export interface AchievementState {
  collected: string[]
  perfectQuizzes: string[]  // dino ids with perfect scores
  totalQuizzesTaken: number
}

export const achievements: Achievement[] = [
  {
    id: 'first-hatch',
    name: 'First Discovery!',
    description: 'Hatch your very first dinosaur',
    icon: '🥚',
    condition: (s) => s.collected.length >= 1,
  },
  {
    id: 'trio',
    name: 'Triple Threat',
    description: 'Collect 3 dinosaurs',
    icon: '🦖',
    condition: (s) => s.collected.length >= 3,
  },
  {
    id: 'half-way',
    name: 'Halfway There!',
    description: 'Collect half of all dinosaurs',
    icon: '⭐',
    condition: (s) => s.collected.length >= Math.ceil(dinosaurs.length / 2),
  },
  {
    id: 'dino-master',
    name: 'Dino Master',
    description: 'Collect ALL dinosaurs!',
    icon: '🏆',
    condition: (s) => s.collected.length >= dinosaurs.length,
  },
  {
    id: 'perfect-score',
    name: 'Perfect Brain!',
    description: 'Get a perfect score on any quiz',
    icon: '🧠',
    condition: (s) => s.perfectQuizzes.length >= 1,
  },
  {
    id: 'quiz-whiz',
    name: 'Quiz Whiz',
    description: 'Get perfect scores on 5 different quizzes',
    icon: '🎓',
    condition: (s) => s.perfectQuizzes.length >= 5,
  },
  {
    id: 'carnivore-club',
    name: 'Carnivore Club',
    description: 'Collect all carnivores',
    icon: '🥩',
    condition: (s) => {
      const carnivores = dinosaurs.filter(d => d.diet === 'Carnivore').map(d => d.id)
      return carnivores.every(id => s.collected.includes(id))
    },
  },
  {
    id: 'herbivore-hero',
    name: 'Herbivore Hero',
    description: 'Collect all herbivores',
    icon: '🌿',
    condition: (s) => {
      const herbivores = dinosaurs.filter(d => d.diet === 'Herbivore').map(d => d.id)
      return herbivores.every(id => s.collected.includes(id))
    },
  },
  {
    id: 'jurassic-complete',
    name: 'Jurassic Explorer',
    description: 'Collect all Jurassic dinosaurs',
    icon: '🌍',
    condition: (s) => {
      const jurassic = dinosaurs.filter(d => d.era === 'Jurassic').map(d => d.id)
      return jurassic.length > 0 && jurassic.every(id => s.collected.includes(id))
    },
  },
  {
    id: 'cretaceous-complete',
    name: 'Cretaceous Champion',
    description: 'Collect all Cretaceous dinosaurs',
    icon: '☄️',
    condition: (s) => {
      const cretaceous = dinosaurs.filter(d => d.era === 'Cretaceous').map(d => d.id)
      return cretaceous.length > 0 && cretaceous.every(id => s.collected.includes(id))
    },
  },
  {
    id: 'quiz-veteran',
    name: 'Quiz Veteran',
    description: 'Complete 10 quizzes',
    icon: '📚',
    condition: (s) => s.totalQuizzesTaken >= 10,
  },
]

const ACHIEVEMENT_KEY = 'dino-achievements'

export function getAchievementState(): AchievementState {
  if (typeof window === 'undefined') return { collected: [], perfectQuizzes: [], totalQuizzesTaken: 0 }
  try {
    const stored = localStorage.getItem(ACHIEVEMENT_KEY)
    if (!stored) return { collected: [], perfectQuizzes: [], totalQuizzesTaken: 0 }
    return JSON.parse(stored)
  } catch {
    return { collected: [], perfectQuizzes: [], totalQuizzesTaken: 0 }
  }
}

export function updateAchievementState(update: Partial<AchievementState>): AchievementState {
  if (typeof window === 'undefined') return { collected: [], perfectQuizzes: [], totalQuizzesTaken: 0 }
  const current = getAchievementState()
  const newState = { ...current, ...update }
  localStorage.setItem(ACHIEVEMENT_KEY, JSON.stringify(newState))
  return newState
}

export function getUnlockedAchievements(): Achievement[] {
  const state = getAchievementState()
  return achievements.filter(a => a.condition(state))
}

export function getNewAchievements(prevState: AchievementState, newState: AchievementState): Achievement[] {
  return achievements.filter(a => a.condition(newState) && !a.condition(prevState))
}

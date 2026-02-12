export interface CollectionState {
  collected: string[]
}

export const getCollection = (): CollectionState => {
  if (typeof window === 'undefined') {
    return { collected: [] }
  }
  
  const stored = localStorage.getItem('dino-collection')
  if (!stored) {
    return { collected: [] }
  }
  
  try {
    return JSON.parse(stored)
  } catch {
    return { collected: [] }
  }
}

export const addToCollection = (dinoId: string): void => {
  if (typeof window === 'undefined') return
  
  const collection = getCollection()
  if (!collection.collected.includes(dinoId)) {
    collection.collected.push(dinoId)
    localStorage.setItem('dino-collection', JSON.stringify(collection))
  }
}

export const isCollected = (dinoId: string): boolean => {
  return getCollection().collected.includes(dinoId)
}

export const getCollectionProgress = (): { collected: number; total: number } => {
  const collection = getCollection()
  return {
    collected: collection.collected.length,
    total: 7 // Total number of dinosaurs
  }
}

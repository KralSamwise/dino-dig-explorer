'use client'

import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'
import * as THREE from 'three'
import { ErrorBoundary } from 'react-error-boundary'

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath)
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return <primitive ref={meshRef} object={scene} scale={1.5} />
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl animate-bounce mb-2">🦴</div>
        <p className="text-lg font-bold text-earth-600">Digging up bones...</p>
      </div>
    </div>
  )
}

function DinoFallback({ dinoId }: { dinoId: string }) {
  const emoji: Record<string, string> = {
    't-rex': '🦖',
    'triceratops': '🦏',
    'stegosaurus': '🦕',
    'velociraptor': '🦎',
    'brachiosaurus': '🦕',
    'pteranodon': '🦅',
    'parasaurolophus': '🦕',
  }

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-sky-200 to-jungle-100 shadow-xl relative flex items-center justify-center">
      <div className="text-center">
        <div className="text-[120px] mb-4">{emoji[dinoId] || '🦖'}</div>
        <p className="text-lg font-bold text-earth-600">
          3D viewer not available
        </p>
        <p className="text-sm text-earth-400 mt-1">
          Check out the facts below! 👇
        </p>
      </div>
    </div>
  )
}

function ErrorFallbackWrapper({ error, dinoId }: { error?: Error; dinoId: string }) {
  return <DinoFallback dinoId={dinoId} />
}

export default function DinoModel({ dinoId }: { dinoId: string }) {
  const modelPath = `/models/${dinoId}.glb`
  const [webglSupported] = useState(() => {
    if (typeof window === 'undefined') return true
    try {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl') || canvas.getContext('webgl2'))
    } catch {
      return false
    }
  })

  if (!webglSupported) {
    return <DinoFallback dinoId={dinoId} />
  }

  return (
    <ErrorBoundary fallback={<DinoFallback dinoId={dinoId} />}>
      <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-sky-200 to-jungle-100 shadow-xl relative">
        <Suspense fallback={<LoadingSpinner />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            gl={{ antialias: true }}
            fallback={<DinoFallback dinoId={dinoId} />}
          >
            <Suspense fallback={null}>
              <Stage environment="city" intensity={0.6}>
                <Model modelPath={modelPath} />
              </Stage>
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                minDistance={2}
                maxDistance={10}
              />
            </Suspense>
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

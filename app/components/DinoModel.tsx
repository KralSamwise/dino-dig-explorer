'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'
import * as THREE from 'three'

function Model({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath)
  const meshRef = useRef<THREE.Group>(null)

  // Auto-rotate
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return <primitive ref={meshRef} object={scene} scale={1.5} />
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-6xl animate-bounce">🦴</div>
    </div>
  )
}

export default function DinoModel({ dinoId }: { dinoId: string }) {
  const modelPath = `/models/${dinoId}.glb`

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-sky-200 to-jungle-100 shadow-xl">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true }}
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
            autoRotate={false}
          />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <Suspense fallback={<LoadingSpinner />} />
      </div>
    </div>
  )
}

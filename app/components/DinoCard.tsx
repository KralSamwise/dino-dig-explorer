'use client'

const dinoSilhouettes: Record<string, string> = {
  't-rex': 'M45,70 C45,55 55,45 65,40 L75,38 L80,35 L85,38 L82,40 L78,39 L75,42 C80,42 85,45 88,50 L90,55 L88,58 L85,56 L83,52 C82,55 80,60 75,65 L70,68 L65,72 L60,75 L55,78 L50,78 C48,76 46,74 45,70 Z M85,38 L87,36 L89,37 L87,39 Z',
  'triceratops': 'M20,60 C20,50 25,42 35,38 L30,30 L35,32 L38,36 L42,28 L45,30 L44,37 C50,35 60,35 70,38 C80,42 85,50 88,58 L90,62 L88,65 L82,65 L80,60 C78,55 72,50 65,48 L60,47 L55,48 L50,52 L48,58 L45,65 L40,68 L35,68 L32,65 C28,65 22,63 20,60 Z',
  'stegosaurus': 'M15,65 C15,58 20,52 30,48 L40,45 L45,43 L48,38 L50,43 L53,38 L55,43 L58,38 L60,43 L63,38 L65,44 L70,46 L75,50 L80,55 L85,60 L88,65 L85,68 L78,68 L75,65 L70,62 L60,60 L50,62 L40,65 L30,68 L22,68 L18,66 Z',
  'velociraptor': 'M30,72 C30,65 35,55 42,48 L48,42 L55,38 L60,35 L65,33 L68,35 L65,38 L60,40 C62,42 63,45 62,48 L58,52 L55,55 L52,60 L50,65 L48,70 L45,74 L40,76 L35,75 C32,74 30,73 30,72 Z M65,33 L68,30 L70,32 L68,35 Z',
  'brachiosaurus': 'M25,75 C25,70 28,65 32,60 L35,55 L38,48 L40,40 L42,32 L45,25 L48,20 L52,18 L55,20 L53,25 L52,30 L53,35 L55,40 L58,48 L62,55 L68,60 L75,65 L80,70 L82,75 L78,78 L72,78 L68,75 L60,72 L50,72 L40,75 L32,78 L28,77 Z',
  'pteranodon': 'M10,50 L20,42 L30,38 L35,35 L25,28 L20,22 L25,20 L35,25 L45,32 L55,35 L65,34 L75,30 L85,25 L90,28 L85,35 L75,40 L65,42 L55,42 L50,45 L48,50 L50,55 L55,58 L52,62 L45,60 L40,55 L35,52 L25,52 L15,52 Z',
  'parasaurolophus': 'M25,68 C25,60 30,52 38,46 L45,42 L52,40 L58,38 L65,33 L70,28 L73,30 L70,35 L65,38 L60,42 C65,44 70,48 72,55 L74,60 L72,65 L68,68 L62,68 L58,65 L55,60 L50,58 L45,60 L40,65 L35,70 L30,72 L27,70 Z',
}

export default function DinoCard({ dino }: { dino: { id: string; name: string; era: string; diet: string; funFact: string; color: string; emoji: string } }) {
  const path = dinoSilhouettes[dino.id] || dinoSilhouettes['t-rex']
  
  return (
    <div className="dino-card">
      {/* Dino Silhouette */}
      <div 
        className="h-48 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: `${dino.color}15` }}
      >
        <svg viewBox="0 0 100 100" className="w-36 h-36 drop-shadow-lg" style={{ filter: `drop-shadow(0 4px 6px ${dino.color}40)` }}>
          <path d={path} fill={dino.color} opacity="0.85" />
        </svg>
        <div className="absolute top-3 right-3 text-4xl">{dino.emoji}</div>
      </div>
      
      {/* Info */}
      <div className="p-6">
        <h3 className="text-2xl font-black text-jungle-800 mb-2">
          {dino.name}
        </h3>
        
        <div className="flex gap-2 mb-3">
          <span className="px-3 py-1 bg-jungle-100 text-jungle-700 rounded-full text-sm font-bold">
            {dino.era}
          </span>
          <span 
            className="px-3 py-1 rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: dino.color }}
          >
            {dino.diet}
          </span>
        </div>
        
        <p className="text-earth-600 text-lg">
          {dino.funFact}
        </p>
      </div>
    </div>
  )
}

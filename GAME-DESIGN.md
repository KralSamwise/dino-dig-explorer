# Dino Dig — Game Design Document

## Overview
**Genre:** Educational Dinosaur AR / Collection  
**Target Age:** 4-10  
**Platform:** Mobile (iOS + Android)  
**Monetization:** Freemium — educational focus  

## Core Concept
Real, scientifically accurate dinosaurs discovered through AR fossil digs. Kids dig up fossils anywhere in their neighborhood, identify them, and resurrect the dinosaurs in AR. Education is the core mechanic — you level up by learning, not grinding.

## Core Loop
1. **Discover** — Dig sites spawn randomly in your neighborhood (AR map)
2. **Dig** — Tap to excavate, brush away dirt to reveal fossils
3. **Identify** — Match fossil pieces, learn what dinosaur it belongs to
4. **Resurrect** — Complete a skeleton → dinosaur comes to life in AR
5. **Learn** — Take quizzes about your dinos to level them up
6. **Collect** — Build your own Jurassic Park (home base collection)

## Spawn System
Dinosaurs spawn based on real-world environment:
- 🌳 **Parks/Green spaces** → Herbivores (Triceratops, Stegosaurus, Brachiosaurus)
- 💧 **Near water** → Aquatic/semi-aquatic (Spinosaurus, Plesiosaur, Mosasaurus)
- 🏙️ **Urban areas** → Raptors and smaller predators (Velociraptor, Compsognathus)
- 🌤️ **Weather affects spawns** — rain brings different species
- 🌙 **Time of day matters** — nocturnal species at night
- 🏛️ **Real museums/dino parks** → Bonus rare finds (NOT required, just a bonus)

## Education = Power
- Quizzes about your dinosaurs increase their level
- Questions scale with age/difficulty setting
- Topics: diet, era, habitat, size comparisons, fun facts
- Parents/teachers can track learning progress
- Correct answers unlock special abilities for your dinos

## Walking & Distance Rewards 🚶
- Distance walked is a core progression mechanic alongside quizzes
- **Dig site discovery** — new dig sites appear as you walk (more steps = more sites per day)
- **Fossil expeditions** — start an "expedition" that requires walking X distance to complete (500m, 1km, 2km)
- **Dino XP** — dinosaurs in your active roster gain passive XP from steps walked
- **Era unlocks** — walk lifetime milestones to unlock new eras (5km=Triassic, 15km=Jurassic, 30km=Cretaceous)
- **Daily step goals** — hit step targets to earn bonus digs, rare fossil fragments, and park decorations
- **Walking streaks** — consecutive days meeting step goals unlock rare species encounters
- Parents love it: combines education AND exercise

## Collection & Home Base
- "Build Your Own Jurassic Park" — place dinos in your custom park
- Dinos interact with each other based on real behavior
- Decorate with era-appropriate plants and terrain
- Share park with friends

## Scientific Accuracy
- Partner with paleontologists for accuracy
- Real scale comparisons (vs humans, cars, buildings)
- Feathered dinosaurs where appropriate
- Era-correct groupings (Triassic, Jurassic, Cretaceous)

## Monetization
- Free to play with daily dig limits
- Premium: extra digs, cosmetic park decorations
- NO pay-to-win — knowledge is the only way to level up
- Optional educator/classroom license

## Tech Considerations
- AR framework (ARKit / ARCore)
- GPS-based spawn system
- 3D dinosaur models — high quality, scientifically accurate
- Quiz/education content database
- COPPA compliance required
- Offline dig mode for areas without good connectivity

## Why Parents Will Love It
- Screen time that's actually educational
- Encourages outdoor activity (like Pokémon Go)
- No predatory monetization
- Learning is literally the game mechanic
- Progress tracking for parents/teachers

## Open Questions
- [ ] 3D model pipeline — license vs create?
- [ ] How many dinosaurs for MVP? (suggest 30-50 species)
- [ ] Classroom/school integration features?
- [ ] Fossil accuracy — real dig techniques vs simplified for kids?
- [ ] MVP scope — start without AR, add it in v2?

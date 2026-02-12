# Dinosaur 3D Models for Dino Dig AR Game

## Overview
This folder contains 7 realistic dinosaur models in GLB format, optimized for AR applications. All models are sourced from **poly.pizza** (Google Poly archive) and created by **Quaternius**.

## Models

### 1. T-Rex (t-rex.glb)
- **Species:** Tyrannosaurus Rex
- **Source:** https://poly.pizza/m/UYtneO5FpF
- **Artist:** Quaternius
- **License:** CC0 (Public Domain)
- **Format:** GLB (Binary glTF 2.0) ✓ Verified
- **File Size:** 329 KB
- **Animated:** No (static pose with rigging)
- **Style:** Low poly, stylized but realistic proportions
- **Downloaded:** 2026-02-12

### 2. Triceratops (triceratops.glb)
- **Species:** Triceratops
- **Source:** https://poly.pizza/m/IGvrUqGrRM
- **Artist:** Quaternius
- **License:** CC0 (Public Domain)
- **Format:** GLB (Binary glTF 2.0) ✓ Verified
- **File Size:** 303 KB
- **Animated:** No (static pose with rigging)
- **Style:** Low poly, stylized but realistic proportions
- **Downloaded:** 2026-02-12

### 3. Stegosaurus (stegosaurus.glb)
- **Species:** Stegosaurus
- **Source:** https://poly.pizza/m/eFcNbOlpvl
- **Artist:** Quaternius
- **License:** CC0 (Public Domain)
- **Format:** GLB (Binary glTF 2.0) ✓ Verified
- **File Size:** 414 KB
- **Animated:** No (static pose with rigging)
- **Style:** Low poly, stylized but realistic proportions
- **Downloaded:** 2026-02-12

### 4. Velociraptor (velociraptor.glb)
- **Species:** Velociraptor
- **Source:** https://poly.pizza/m/cnlGH2UcDd
- **Artist:** Quaternius
- **License:** CC0 (Public Domain)
- **Format:** GLB (Binary glTF 2.0) ✓ Verified
- **File Size:** 280 KB
- **Animated:** No (static pose with rigging)
- **Style:** Low poly, stylized but realistic proportions
- **Downloaded:** 2026-02-12

### 5. Brachiosaurus (brachiosaurus.glb)
- **Species:** Apatosaurus (close relative of Brachiosaurus)
- **Source:** https://poly.pizza/m/fvo0x8Zk3z
- **Artist:** Quaternius
- **License:** CC0 (Public Domain)
- **Format:** GLB (Binary glTF 2.0) ✓ Verified
- **File Size:** 372 KB
- **Animated:** No (static pose with rigging)
- **Style:** Low poly, stylized but realistic proportions
- **Note:** Using Apatosaurus as a substitute - both are large sauropods with similar appearance
- **Downloaded:** 2026-02-12

### 6. Pteranodon (pteranodon.glb)
- **Species:** Pteranodon (Pterablocktyls - stylized)
- **Source:** https://poly.pizza/m/1tuiNTr4-MX
- **Artist:** Hoai Nguyen
- **License:** CC0 (Public Domain)
- **Format:** GLB (Binary glTF 2.0) ✓ Verified
- **File Size:** 3.8 MB (highest detail model)
- **Animated:** No (static pose with rigging)
- **Style:** Low poly, blocky/stylized (more detailed than others)
- **Note:** Largest file due to additional geometric detail
- **Downloaded:** 2026-02-12

### 7. Parasaurolophus (parasaurolophus.glb)
- **Species:** Parasaurolophus
- **Source:** https://poly.pizza/m/KeeQrrouRK
- **Artist:** Quaternius
- **License:** CC0 (Public Domain)
- **Format:** GLB (Binary glTF 2.0) ✓ Verified
- **File Size:** 285 KB
- **Animated:** No (static pose with rigging)
- **Style:** Low poly, stylized but realistic proportions
- **Note:** Substituted for Ankylosaurus (not available in free GLB format)
- **Downloaded:** 2026-02-12

## License Information
All models are licensed under **CC0 (Creative Commons Zero)**, which means:
- ✅ Commercial use allowed
- ✅ Modification allowed
- ✅ Distribution allowed
- ✅ No attribution required (but appreciated!)

## Technical Specifications
- **Format:** GLB (Binary glTF 2.0) ✓ All files verified
- **AR Compatibility:** ✅ Ready for AR frameworks (ARCore, ARKit, WebXR, 8th Wall)
- **Total Size:** 5.7 MB for all 7 models
- **File Sizes:** 280 KB - 3.8 MB per model
- **Textures:** Embedded in GLB files (no external dependencies)
- **Rigging:** Basic skeleton structure included (animation-ready)
- **Style:** Low poly, optimized for mobile AR performance
- **Lighting:** Models work well with standard PBR materials

## Model Assessment

### ✅ Requirements Met:
- GLB format (AR-ready) ✓
- Free/CC0 licensed ✓
- Reasonable poly counts for mobile AR ✓
- Consistent art style across models ✓

### ⚠️ Limitations:
- **Style:** These are low-poly/stylized models, not photorealistic
  - Good for stylized AR games
  - May need higher-poly models for realistic AR applications
- **Animation:** Not animated (static poses)
  - Models have basic rigging for future animation
- **Substitutions:** 
  - Apatosaurus used instead of Brachiosaurus (very similar appearance)
  - Parasaurolophus used instead of Ankylosaurus (no free GLB available)

## Alternative Sources for More Realistic Models
If photorealistic models are required, consider:
1. **Sketchfab** (requires account for downloads)
   - Many high-quality dinosaur models
   - Some free, some paid
   - GLB export available
2. **TurboSquid Free Section**
   - Mix of quality and styles
   - Some require format conversion
3. **CGTrader Free Models**
   - Various formats available
4. **Quaternius Patreon** (paid)
   - Higher quality animated packs
   - Source files with more detail

## Usage in AR
These models are optimized for mobile AR:
```javascript
// Example: Loading in Three.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
loader.load('models/t-rex.glb', (gltf) => {
  scene.add(gltf.scene);
});
```

## Credits
- **Models:** Quaternius (6 models), Hoai Nguyen (1 model)
- **Source:** poly.pizza (Google Poly archive)
- **Collection Date:** February 12, 2026
- **Collected by:** OpenClaw AI Agent (subagent: dino-models)

## Notes
All models from the same artist (Quaternius) maintain visual consistency, making them ideal for a cohesive AR experience. The low poly count ensures smooth performance on mobile devices while still being recognizable as their respective species.

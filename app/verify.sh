#!/bin/bash

# Dino Dig Explorer - Verification Script
# Checks that everything is ready for deployment

echo "🦖 Dino Dig Explorer - Pre-Deployment Checklist"
echo "================================================"
echo ""

FAILED=0

# Check Node modules
echo -n "✓ Checking node_modules... "
if [ -d "node_modules" ]; then
    echo "✅ Found"
else
    echo "❌ Missing - run 'npm install'"
    FAILED=1
fi

# Check 3D models
echo -n "✓ Checking 3D models... "
MODEL_COUNT=$(ls -1 public/models/*.glb 2>/dev/null | wc -l)
if [ "$MODEL_COUNT" -eq 7 ]; then
    echo "✅ All 7 models present"
else
    echo "❌ Found $MODEL_COUNT/7 models"
    FAILED=1
fi

# Check data file
echo -n "✓ Checking dinosaur data... "
if [ -f "data/dinosaurs.json" ]; then
    DINO_COUNT=$(grep -o '"id"' data/dinosaurs.json | wc -l)
    echo "✅ Found $DINO_COUNT dinosaurs"
else
    echo "❌ data/dinosaurs.json missing"
    FAILED=1
fi

# Check key pages
echo -n "✓ Checking pages... "
PAGES=0
[ -f "app/page.tsx" ] && ((PAGES++))
[ -f "app/explore/page.tsx" ] && ((PAGES++))
[ -f "app/explore/[id]/page.tsx" ] && ((PAGES++))
[ -f "app/quiz/[id]/page.tsx" ] && ((PAGES++))
[ -f "app/collection/page.tsx" ] && ((PAGES++))

if [ "$PAGES" -eq 5 ]; then
    echo "✅ All 5 pages present"
else
    echo "❌ Found $PAGES/5 pages"
    FAILED=1
fi

# Check components
echo -n "✓ Checking components... "
if [ -f "components/DinoModel.tsx" ]; then
    echo "✅ DinoModel component found"
else
    echo "❌ DinoModel.tsx missing"
    FAILED=1
fi

# Check build files
echo -n "✓ Checking build status... "
if [ -d ".next" ]; then
    echo "✅ Built successfully"
else
    echo "⚠️  Not built yet - run 'npm run build'"
fi

# Check configs
echo -n "✓ Checking configs... "
CONFIGS=0
[ -f "next.config.js" ] && ((CONFIGS++))
[ -f "tailwind.config.ts" ] && ((CONFIGS++))
[ -f "tsconfig.json" ] && ((CONFIGS++))

if [ "$CONFIGS" -eq 3 ]; then
    echo "✅ All configs present"
else
    echo "❌ Missing configs"
    FAILED=1
fi

echo ""
echo "================================================"

if [ "$FAILED" -eq 0 ]; then
    echo "✅ ALL CHECKS PASSED!"
    echo ""
    echo "🚀 Ready to deploy! Run one of these:"
    echo "   • npm run dev      (test locally)"
    echo "   • npx vercel       (deploy to Vercel)"
    echo ""
    echo "🎉 Your Dino Dig Explorer is ready!"
else
    echo "❌ Some checks failed - please fix above issues"
    exit 1
fi

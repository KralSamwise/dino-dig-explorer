# 🚀 Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel CLI (Fastest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# From the app directory
cd /home/kralsamwise/.openclaw/workspace/projects/dino-dig/app

# Deploy!
vercel
```

Follow the prompts:
1. "Set up and deploy?" → Yes
2. "Which scope?" → Select your account
3. "Link to existing project?" → No
4. "What's your project's name?" → dino-dig-explorer
5. "In which directory is your code located?" → ./
6. Vercel will auto-detect Next.js settings

### Option 2: GitHub + Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   cd /home/kralsamwise/.openclaw/workspace/projects/dino-dig/app
   git init
   git add .
   git commit -m "Initial commit: Dino Dig Explorer"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy via Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js - just click "Deploy"!

## Environment Setup

No environment variables needed! The app works out of the box.

## Build Configuration

The app uses standard Next.js settings:
- **Framework:** Next.js
- **Build Command:** `next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## Performance Tips

### 3D Model Optimization

The GLB models are already optimized, but for even better performance:

1. **Lazy Loading:** 3D models are already dynamically imported with `ssr: false`
2. **Model Size:** Current models are reasonably sized (300KB - 4MB)
3. **Compression:** Consider using Draco compression for models if needed

### Caching

Vercel automatically handles caching for:
- Static assets (images, 3D models)
- Next.js pages and API routes
- Edge network distribution

## Post-Deployment Checklist

- [ ] Test on mobile devices (iOS Safari, Chrome Mobile)
- [ ] Verify 3D models load correctly
- [ ] Test localStorage (collection system)
- [ ] Check quiz flow and scoring
- [ ] Verify all navigation links work
- [ ] Test filters on explore page

## Troubleshooting

### 3D Models Not Loading

**Issue:** White screen or missing 3D viewer

**Fix:**
1. Check browser console for errors
2. Verify all `.glb` files are in `public/models/`
3. Ensure Three.js packages are installed:
   ```bash
   npm install three @react-three/fiber @react-three/drei
   ```

### Build Errors

**Issue:** Build fails on Vercel

**Common fixes:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild locally first
npm run build
```

### localStorage Not Persisting

**Issue:** Collection resets on reload

**Fix:** localStorage works on HTTPS. Make sure you're testing on the deployed Vercel URL, not localhost in incognito mode.

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Analytics (Optional)

Enable Vercel Analytics:
1. Project Settings → Analytics
2. Enable "Web Analytics"
3. No code changes needed!

## Updates and Maintenance

To update the deployed app:

```bash
# Make your changes
git add .
git commit -m "Update: description"
git push

# Vercel auto-deploys on push!
```

Or with Vercel CLI:
```bash
vercel --prod
```

---

## Local Development Reminder

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Test production build
npm start
```

The app will be available at `http://localhost:3000`

---

Happy deploying! 🦖✨

# 🦖 Dino Dig Explorer

An educational dinosaur exploration game for kids ages 4-10!

## Features

- 🔍 **Explore 7 Dinosaurs**: Learn about T-Rex, Triceratops, Stegosaurus, and more!
- 🎮 **Interactive 3D Models**: Rotate, zoom, and explore dinosaurs in 3D
- 🎯 **Educational Quizzes**: Test your knowledge and collect dinosaurs
- 🥚 **Collection System**: Track your progress and "hatch" new dinos
- 🎨 **Kid-Friendly Design**: Big buttons, bright colors, fun animations

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Three.js / React Three Fiber** (3D models)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=your-repo-url)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Click "Deploy"

That's it! Vercel will automatically detect Next.js and configure everything.

## Project Structure

```
app/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── explore/           # Dinosaur browser
│   ├── explore/[id]/      # Dinosaur detail pages
│   ├── quiz/[id]/         # Quiz pages
│   └── collection/        # Collection tracker
├── components/            # React components
│   └── DinoModel.tsx      # 3D model viewer
├── data/                  # JSON data
│   └── dinosaurs.json     # Dinosaur information
├── lib/                   # Utilities
│   └── collection.ts      # Collection management
└── public/                # Static files
    └── models/            # 3D GLB models
```

## Customization

### Adding More Dinosaurs

1. Add a new entry to `data/dinosaurs.json`
2. Add the corresponding GLB model to `public/models/`
3. Update the total count in `lib/collection.ts`

### Changing Colors

Edit the Tailwind theme in `tailwind.config.ts` to customize the jungle and earth color palettes.

## Educational Goals

- Learn dinosaur names and pronunciations
- Understand different time periods (Triassic, Jurassic, Cretaceous)
- Compare dinosaur sizes and characteristics
- Practice reading comprehension through fun facts
- Reinforce learning through quizzes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

---

Made with 💚 for curious young paleontologists!

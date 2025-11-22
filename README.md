# 💙 Birthday Website - A Heartfelt Scrolling Experience

A beautiful, interactive single-page birthday website built with Next.js, featuring smooth scroll animations, interactive elements inspired by neal.fun, and a cozy blue aesthetic.

## ✨ Features

- **Smooth Background Transitions** - Seamless crossfade between section backgrounds as you scroll (no visible boundaries!)
- **Hero Section** - Elegant landing with animated particles and gradient background
- **Arcane Mood Section** - Parallax layers with rotating glyph effects inspired by Arcane's visual style
- **Brooklyn 99 Quiz** - Interactive personality quiz with instant results
- **Memory Gallery** - Beautiful photo grid with lightbox view (placeholders included)
- **Interactive Journey Map** - Neal.fun-style scroll toy showing your relationship timeline
- **Shayari Section** - Elegant poetry display with reveal animations
- **Playlist Corner** - Custom music player interface with visualizer
- **Date Planner** - Interactive card for planning future dates with confetti effect
- **Responsive Footer** - With links and animated hearts

## 🎨 Design Features

- **Color Palette**: Predominantly blue with warm gold/peach accents
- **Typography**: Elegant heading font with clean body text
- **Background Transitions**: Smooth, seamless crossfading between section backgrounds as you scroll
- **Animations**: Smooth scroll-based animations, hover effects, and micro-interactions
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels, reduced motion support
- **Performance**: Optimized for Core Web Vitals (LCP, TBT, CLS)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm installed
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sahil-idk/Nbday.git
   cd Nbday
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

### 1. Edit Content

All text content is centralized in `content.json`. Edit this file to customize:

- Hero headline and name
- Arcane section titles
- Brooklyn 99 quiz questions and results
- Memory gallery photo captions
- Journey map locations
- Shayari/poetry lines
- Playlist songs
- Date ideas
- Footer message

**Example:**
```json
{
  "hero": {
    "name": "Sarah",
    "headline": "For Sarah — a little blue for your birthday"
  }
}
```

### 2. Add Photos

1. Place your photos in the `public/photos/` directory
2. Name them as referenced in `content.json` (e.g., `garba.jpg`, `photo2.jpg`, etc.)
3. Supported formats: JPG, PNG, WebP
4. Recommended size: 1200x1200px for best quality

**Photo structure:**
```
public/
  └── photos/
      ├── garba.jpg
      ├── photo2.jpg
      ├── photo3.jpg
      ├── photo4.jpg
      ├── photo5.jpg
      └── photo6.jpg
```

### 3. Add Background Images (Optional)

Each section can have its own background image that smoothly transitions as you scroll!

1. Add images to `public/backgrounds/` directory
2. Name them exactly as: `hero.jpg`, `arcane.jpg`, `brooklyn99.jpg`, `gallery.jpg`, `journey.jpg`, `shayari.jpg`, `playlist.jpg`, `date.jpg`, `footer.jpg`
3. Recommended specs:
   - Format: JPG or WebP
   - Size: 1920x1080px (Full HD)
   - File size: Under 500KB each
   - Style: Blue tones, slightly blurred for dreamy effect

**The backgrounds will seamlessly crossfade with no visible boundaries as you scroll!**

**Background structure:**
```
public/
  └── backgrounds/
      ├── hero.jpg
      ├── arcane.jpg
      ├── brooklyn99.jpg
      ├── gallery.jpg
      ├── journey.jpg
      ├── shayari.jpg
      ├── playlist.jpg
      ├── date.jpg
      └── footer.jpg
```

If no images are added, beautiful blue gradients are used by default.

### 4. Add Music (Optional)

To enable actual playback in the Playlist section:

1. Host your audio files (MP3/M4A) on a CDN or in the `public` directory
2. Update the `url` field in `content.json`:
   ```json
   "songs": [
     {
       "name": "Song Name",
       "artist": "Artist Name",
       "url": "/music/song1.mp3"
     }
   ]
   ```
3. Update `PlaylistSection.tsx` to use an `<audio>` element with the URLs

### 5. Customize Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    // Change these values for different blue shades
    500: '#3b82f6',
    600: '#2563eb',
    // ... etc
  },
  arcane: {
    gold: '#d4af37',    // Accent color
    peach: '#ffb89d',   // Warm accent
    // ... etc
  }
}
```

### 5. Add Easter Eggs (Audio)

In `InteractiveScroll.tsx`, replace the console.log with actual audio:

```typescript
const audio = new Audio('/sounds/easter-egg.mp3');
audio.play();
```

## 🏗️ Build for Production

### Static Export (Recommended for hosting)

```bash
npm run build
```

This creates an optimized static export in the `out/` directory.

### Preview Production Build

```bash
npm run start
```

## 🌐 Deployment

### Deploy to Vercel (Easiest)

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts** to link your project and deploy

Alternatively, use the Vercel web interface:
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel will auto-detect Next.js and deploy

### Deploy to Netlify

1. Build the static export:
   ```bash
   npm run build
   ```

2. Drag and drop the `out/` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

### Deploy to GitHub Pages

1. Update `next.config.mjs` with your repo name:
   ```javascript
   const nextConfig = {
     output: 'export',
     basePath: '/Nbday',  // Your repo name
     images: { unoptimized: true }
   };
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Use a tool like gh-pages package
   ```

## 📁 Project Structure

```
Nbday/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── Hero.tsx
│   ├── ArcaneSection.tsx
│   ├── Brooklyn99Card.tsx
│   ├── MemoryGallery.tsx
│   ├── InteractiveScroll.tsx
│   ├── ShayariSection.tsx
│   ├── PlaylistSection.tsx
│   ├── DateCard.tsx
│   └── Footer.tsx
├── public/
│   └── photos/          # Your photos go here
├── content.json         # ⭐ Edit this for content
├── tailwind.config.ts   # Styling configuration
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: CSS animations + React hooks
- **Deployment**: Vercel/Netlify/GitHub Pages

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Reduced motion support (respects `prefers-reduced-motion`)
- High contrast ratios for text
- Alt text for images (add to content.json)

## 🎯 Performance

- Static site generation for fast loading
- Optimized images (use WebP format)
- Minimal JavaScript bundle
- CSS-based animations (GPU accelerated)
- Lazy loading for images

## 📄 License

This is a personal project. Feel free to use it as inspiration for your own projects!

## 🤝 Contributing

This is a personal birthday gift project, but if you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 💌 Credits

**Built with love by Sahil**

Inspired by:
- [neal.fun/space-elevator](https://neal.fun/space-elevator/) - Interactive design
- **Arcane** - Visual aesthetics and color palette
- **Brooklyn 99** - Humor and personality

---

## 🎁 Final Checklist Before Deploying

- [ ] Update `content.json` with actual names and text
- [ ] Add your 6-10 photos to `public/photos/`
- [ ] Add your finalized shayari to `content.json`
- [ ] Update playlist songs (names and artists minimum)
- [ ] Test on mobile device
- [ ] Test all interactive elements
- [ ] Update GitHub repo URL in footer
- [ ] Deploy to your chosen platform
- [ ] Share the URL! 💙

---

**Happy Birthday! 🎉**

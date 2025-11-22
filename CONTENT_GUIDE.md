# 📝 Content Customization Guide

This guide will help you quickly update all the personal content in the birthday website.

## 🎯 Quick Start - What to Update

### 1. Her Name & Headline
**File**: `content.json`

```json
"hero": {
  "name": "Her Name Here",
  "headline": "For [Her Name] — a little blue for your birthday",
  "scrollCta": "Scroll to open"
}
```

### 2. Shayari (Poetry)
**File**: `content.json`

Replace these placeholder lines with your finalized shayari:

```json
"shayari": {
  "title": "For You",
  "lines": [
    "Your shayari line 1 goes here",
    "Your shayari line 2 goes here",
    "Your shayari line 3 goes here"
  ],
  "signature": "— Sahil"
}
```

**Example:**
```json
"lines": [
  "तेरी हँसी में है वो सुकून जो ढूंढता था मैं",
  "तेरे साथ के हर पल में खुद को खो जाता हूं मैं",
  "Blue जैसी शांत, गर्म जैसी comfort, तू ही तो है मेरी दुनिया"
]
```

### 3. Photos
**Location**: `public/photos/`

Add 6-10 photos with these exact filenames (or update content.json to match your filenames):

- `garba.jpg` - The garba night photo
- `photo2.jpg` - Any memory
- `photo3.jpg` - Any memory
- `photo4.jpg` - Any memory
- `photo5.jpg` - Any memory
- `photo6.jpg` - Any memory

**Update captions** in `content.json`:

```json
"memoryGallery": {
  "photos": [
    {
      "src": "/photos/garba.jpg",
      "caption": "Update this caption for garba photo",
      "alt": "Garba night memory"
    },
    ...
  ]
}
```

### 4. Playlist Songs
**File**: `content.json`

```json
"playlist": {
  "songs": [
    { "name": "Song Name 1", "artist": "Artist Name 1", "url": "" },
    { "name": "Song Name 2", "artist": "Artist Name 2", "url": "" },
    { "name": "Song Name 3", "artist": "Artist Name 3", "url": "" },
    { "name": "Song Name 4", "artist": "Artist Name 4", "url": "" },
    { "name": "Song Name 5", "artist": "Artist Name 5", "url": "" },
    { "name": "Song Name 6", "artist": "Artist Name 6", "url": "" }
  ]
}
```

**Example:**
```json
{ "name": "Tum Se Hi", "artist": "Mohit Chauhan", "url": "" }
```

### 5. Journey Timeline
**File**: `content.json`

Update the locations in your journey together:

```json
"interactiveScroll": {
  "locations": [
    { "name": "First Meet", "position": 10 },
    { "name": "Garba Night", "position": 30 },
    { "name": "First Drive", "position": 50 },
    { "name": "Your Custom Moment", "position": 70 },
    { "name": "Today!", "position": 90 }
  ]
}
```

### 6. Date Ideas
**File**: `content.json`

Customize the date planning cards:

```json
"dateCard": {
  "ideas": [
    {
      "title": "Sunset Drive",
      "description": "Coffee, music, and golden hour views",
      "icon": "🌅"
    },
    ...
  ]
}
```

### 7. Footer Message
**File**: `content.json`

```json
"footer": {
  "message": "Happy Birthday! Here's to more blue moments, quiet drives, and holding hands in hoodie pockets. 💙",
  "githubUrl": "https://github.com/sahil-idk/Nbday",
  "builtBy": "Built with love by Sahil"
}
```

## 📸 Photo Guidelines

### Recommended Specs:
- **Format**: JPG or WebP (for smaller file sizes)
- **Size**: 1200x1200px (square) or 1920x1080px (landscape)
- **File Size**: Keep under 500KB per image
- **Quality**: 80-85% JPEG quality is perfect

### How to Optimize Photos:
Use online tools like:
- [TinyPNG](https://tinypng.com/) - Compress images
- [Squoosh](https://squoosh.app/) - Advanced compression
- [CloudConvert](https://cloudconvert.com/) - Format conversion

## 🎵 Adding Actual Music (Optional)

To enable real audio playback:

1. **Host your audio files:**
   - Upload to a cloud service (Google Drive, Dropbox, etc.) and get public links
   - Or place MP3 files in `public/music/` folder

2. **Update content.json:**
   ```json
   { "name": "Song Name", "artist": "Artist", "url": "/music/song.mp3" }
   ```

3. **Update the PlaylistSection component** (optional, for advanced users)

## 🎨 Color Customization (Advanced)

If you want to change the blue color scheme:

**File**: `tailwind.config.ts`

Find the `primary` colors and modify:

```typescript
primary: {
  500: '#3b82f6',  // Main blue - change this
  600: '#2563eb',  // Darker blue
  // ... etc
}
```

## ✅ Pre-Deploy Checklist

Before deploying, make sure you've updated:

- [ ] Her name in hero section
- [ ] All 3 lines of shayari
- [ ] Added 6-10 photos to `public/photos/`
- [ ] Updated photo captions
- [ ] Added playlist song names
- [ ] Customized journey timeline locations
- [ ] Updated footer message
- [ ] Tested locally with `npm run dev`

## 🚀 Quick Test

After making changes:

1. Save all files
2. Run `npm run dev`
3. Open http://localhost:3000
4. Scroll through and verify all content
5. Test on mobile (Chrome DevTools → Toggle Device Toolbar)

## 💡 Tips

- **Keep it personal**: Use inside jokes, specific moments only you two know
- **Balance text**: Don't make captions too long
- **Photo variety**: Mix selfies, scenery, and activity photos
- **Test everything**: Click all buttons, scroll through all sections
- **Share drafts**: Send screenshots to a friend for feedback (if you want)

---

**Need help?** Check the main README.md or reach out!

# Image Carousel Files

Add your favorite web series scenes, screenshots, or images here to display in the interactive birthday carousel!

## Required Files:

Place your PNG/JPG images in this folder with these names:
- `image1.png` (or .jpg)
- `image2.png` (or .jpg)
- `image3.png` (or .jpg)
- `image4.png` (or .jpg)
- `image5.png` (or .jpg)

You can add more images! Just update the `content.json` file with additional image entries.

## Supported Formats:
- **PNG** (recommended - transparent backgrounds supported)
- **JPG/JPEG** (good for photos and screenshots)
- **WebP** (modern format, great compression)

## Image Specifications:

### Recommended Size:
- **Width**: 1920px (or 1280px minimum)
- **Height**: 1080px (or 720px minimum)
- **Aspect Ratio**: 16:9 (widescreen) or 16:10 work best
- **File Size**: Keep under 2MB each for fast loading

### Tips for Best Quality:
1. **High Resolution**: Use HD or Full HD screenshots/images
2. **Clear Quality**: Avoid blurry or pixelated images
3. **Good Composition**: Center the important parts of the scene
4. **Consistent Sizing**: Try to keep all images the same dimensions

## Where to Get Images:

### From Web Series:
1. Take screenshots while watching (use Netflix, Prime Video, etc.)
2. Search Google Images: `"[series name] scene HD"` or `"[series name] screenshot"`
3. Fan sites and wikis often have high-quality scene captures
4. Pinterest and Tumblr have curated collections

### Image Sources:
- **Netflix Screenshots**: Pause at your favorite scene and screenshot
- **Google Images**: Search with filters (Size: Large, Type: Photo)
- **IMDb**: Often has high-quality stills from shows
- **Fandom Wikis**: TV show wikis have scene galleries
- **Pinterest**: Search `"[show name] scenes"` or `"[show name] aesthetic"`

## How to Add Images:

1. **Download/Screenshot** your favorite scenes
2. **Rename** them to:
   - `image1.png`
   - `image2.png`
   - `image3.png`
   - etc.
3. **Place** them in this folder: `/public/carousel/`

## Updating Captions and Info:

Edit the `/content.json` file to customize each image:

```json
"carousel": {
  "title": "Our Favorite Moments",
  "subtitle": "A collection of scenes that remind me of us",
  "images": [
    {
      "src": "/carousel/image1.png",
      "caption": "When we talked about this scene for hours",
      "series": "Arcane",
      "alt": "Vi and Powder scene"
    },
    {
      "src": "/carousel/image2.png",
      "caption": "This reminds me of our late-night conversations",
      "series": "Brooklyn Nine-Nine",
      "alt": "Jake and Amy coffee scene"
    }
  ]
}
```

### To Add More Images:

1. Add the image file: `image6.png`, `image7.png`, etc.
2. Add the configuration in `content.json`:

```json
{
  "src": "/carousel/image6.png",
  "caption": "Your custom caption here",
  "series": "The show/series name",
  "alt": "Description for accessibility"
}
```

## Carousel Features:

Your carousel includes:
- ✨ **Auto-play** - Automatically cycles through images every 4 seconds
- ⏸️ **Pause on Hover** - Pauses when you hover over it
- ⬅️ **Navigation Arrows** - Click to go back/forward
- 🔵 **Dot Indicators** - Click any dot to jump to that image
- 🎂 **Birthday Decorations** - Floating confetti and birthday emojis
- 📝 **Captions** - Shows your custom caption and series name
- 📱 **Mobile Responsive** - Looks great on all screen sizes

## Example Image Ideas:

1. **Romantic Scenes**: Scenes that remind you of your relationship
2. **Funny Moments**: Comedy scenes from shows you both love
3. **Aesthetic Shots**: Beautiful cinematography that matches your vibe
4. **Character Moments**: Scenes with characters you both relate to
5. **Memorable Quotes**: Scenes with quotes you often reference

## File Structure:
```
public/
└── carousel/
    ├── image1.png
    ├── image2.png
    ├── image3.png
    ├── image4.png
    ├── image5.png
    └── README.md (this file)
```

## Pro Tips:

1. **Mix It Up**: Include scenes from different shows/series
2. **Tell a Story**: Arrange images to flow like a narrative
3. **Personal Touch**: Choose scenes that have personal meaning
4. **Quality Over Quantity**: 5-10 great images > 20 mediocre ones
5. **Test on Mobile**: Make sure images look good on small screens

## Troubleshooting:

**Image not showing?**
- Check file name matches exactly (case-sensitive)
- Ensure image is in `/public/carousel/` folder
- Verify the path in `content.json` starts with `/carousel/`
- Check image file isn't corrupted

**Image looks blurry?**
- Use higher resolution images (1920x1080 recommended)
- Avoid upscaling small images
- Use PNG for sharper quality

**Carousel too slow/fast?**
- Edit `ImageCarousel.tsx`
- Change the interval on line 23: `}, 4000);` (4000 = 4 seconds)

Ready to create an amazing carousel of memories! 🎉

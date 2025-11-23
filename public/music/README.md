# Music / Audio Files

Add your song files here for the audio players throughout the website.

## Required Files:

1. **`come-back-2-me.mp3`** - RM's "Come back 2 me" for the birthday message section (plays from 2:15 to end)
2. **`ma-meilleure-ennemie.mp3`** - "Ma Meilleure Ennemie" from Arcane for the music section

## Where to Get the Songs:

### Option 1: Purchase/Stream Downloads
- **Spotify**: Download for offline listening (requires Premium)
- **Apple Music**: Download purchased songs
- **Amazon Music**: Purchase and download
- **YouTube Music**: Download for offline (requires Premium)

### Option 2: Convert from YouTube (for personal use)
- Use tools like [YouTube to MP3 converters](https://ytmp3.cc/)
- Search for "Come back 2 me RM" and "Ma Meilleure Ennemie Arcane"
- Download as MP3

### Option 3: Use Spotify Web Playback SDK (Advanced)
If you prefer streaming from Spotify instead of files, you can integrate the Spotify Web Playback SDK. This requires a Spotify Developer account.

## Supported Formats:
- **MP3** (recommended - best compatibility)
- **M4A** (AAC audio)
- **OGG** (open format)
- **WAV** (uncompressed, larger files)

## How to Add:

1. **Download the songs** using one of the methods above
2. **Convert to MP3** (if needed):
   - Use [CloudConvert](https://cloudconvert.com/mp3-converter)
   - Or [Online Audio Converter](https://online-audio-converter.com/)
3. **Rename the files**:
   - `come-back-2-me.mp3`
   - `ma-meilleure-ennemie.mp3`
4. **Place them here**: `/public/music/`

## File Structure:
```
public/
└── music/
    ├── come-back-2-me.mp3
    └── ma-meilleure-ennemie.mp3
```

## File Size Recommendations:
- Keep under 10MB each for good loading performance
- 3-5 minute songs typically: 3-7MB in MP3 format
- Use 192-320 kbps bitrate for good quality

## Song Information in content.json:

The song information is already configured in `content.json`:

```json
"lyricsSection": {
  "title": "How I See You",
  "songTitle": "Ma Meilleure Ennemie",
  "songArtist": "Stromae & Pomme (Arcane)",
  "songUrl": "/music/ma-meilleure-ennemie.mp3"
}
```

No lyrics configuration needed - just add the MP3 file!

## Features:

### Birthday Message Section (Come back 2 me):
- **Automatically starts at 2:15** (2 minutes 15 seconds) when you press play
- Play/Pause button
- Song title and artist display
- Animated audio visualizer bars
- Auto-stops at end of song

### Music Section (Ma Meilleure Ennemie):
- **Autoplay** when scrolling into view (browser permitting)
- Very transparent player design - shows the shayari.gif background
- Animated "How I See You" title
- Play/Pause controls
- Audio visualizer
- Beautiful integration with background GIF

## Testing:
After adding both MP3 files, the website will have two beautiful music experiences!

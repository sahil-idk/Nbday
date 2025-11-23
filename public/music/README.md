# Music / Audio Files

Add your song files here for the audio players throughout the website.

## Required Files:

1. **`forever-rain.mp3`** - RM's "forever rain" for the birthday message section
2. **`ma-meilleure-ennemie.mp3`** - "Ma Meilleure Ennemie" from Arcane for the lyrics section

## Where to Get the Songs:

### Option 1: Purchase/Stream Downloads
- **Spotify**: Download for offline listening (requires Premium)
- **Apple Music**: Download purchased songs
- **Amazon Music**: Purchase and download
- **YouTube Music**: Download for offline (requires Premium)

### Option 2: Convert from YouTube (for personal use)
- Use tools like [YouTube to MP3 converters](https://ytmp3.cc/)
- Search for "forever rain RM" and "Ma Meilleure Ennemie Arcane"
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
   - `forever-rain.mp3`
   - `ma-meilleure-ennemie.mp3`
4. **Place them here**: `/public/music/`

## File Structure:
```
public/
└── music/
    ├── forever-rain.mp3
    └── ma-meilleure-ennemie.mp3
```

## File Size Recommendations:
- Keep under 10MB each for good loading performance
- 3-5 minute songs typically: 3-7MB in MP3 format
- Use 192-320 kbps bitrate for good quality

## Adding Lyrics for "Ma Meilleure Ennemie":

You'll need to add the song lyrics to `content.json`. Open the file and update the `lyricsSection`:

```json
"lyricsSection": {
  "title": "How I See You",
  "songTitle": "Ma Meilleure Ennemie",
  "songArtist": "Stromae & Pomme (Arcane)",
  "songUrl": "/music/ma-meilleure-ennemie.mp3",
  "lyrics": [
    { "text": "First line of lyrics", "startTime": 0 },
    { "text": "Second line of lyrics", "startTime": 3.5 },
    { "text": "Third line of lyrics", "startTime": 7 },
    { "text": "Fourth line of lyrics", "startTime": 10.5 }
  ]
}
```

**How to set timing:**
1. Play the song and note when each lyric line starts (in seconds)
2. Update the `startTime` values accordingly
3. The lyrics will fade in as the song plays!

**Where to find lyrics:**
- Search "Ma Meilleure Ennemie lyrics" on Google
- Use [Genius.com](https://genius.com)
- Use [AZLyrics.com](https://azlyrics.com)
- Listen to the song and type them yourself

## Features:

### Birthday Message Section (Forever Rain):
- Play/Pause button
- Song title and artist display
- Animated audio visualizer bars
- Auto-stops at end of song

### Lyrics Section (Ma Meilleure Ennemie):
- **Autoplay** when scrolling into view
- Very transparent player design
- Animated "How I See You" title
- Lyrics fade in synchronized with the song
- Play/Pause controls
- Audio visualizer

## Testing:
After adding both files and updating the lyrics in `content.json`, the website will have two beautiful music experiences!

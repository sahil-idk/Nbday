# Music / Audio Files

Add your song file here for the birthday message section audio player.

## Required File:
- `birthday-song.mp3` - The special song for the birthday message section

## Supported Formats:
- **MP3** (recommended - best compatibility)
- **M4A** (AAC audio)
- **OGG** (open format)
- **WAV** (uncompressed, larger files)

## How to Add:

1. **Choose your song** - Pick a meaningful song for the birthday message
2. **Convert to MP3** (if needed):
   - Use [CloudConvert](https://cloudconvert.com/mp3-converter)
   - Or [Online Audio Converter](https://online-audio-converter.com/)
3. **Name the file**: `birthday-song.mp3`
4. **Place it here**: `public/music/birthday-song.mp3`

## Update Song Info:

Edit `content.json` to update the song details:

```json
"birthdayMessage": {
  "songTitle": "Your Song Name Here",
  "songArtist": "Artist Name Here",
  "songUrl": "/music/birthday-song.mp3"
}
```

## File Size Recommendations:
- Keep under 10MB for good loading performance
- 3-5 minute songs typically: 3-7MB in MP3 format
- Use 192-320 kbps bitrate for good quality

## Testing:
After adding the file, the audio player in the birthday message section will allow you to play/pause the song with a visualizer animation!

The player features:
- Play/Pause button
- Song title and artist display
- Animated audio visualizer bars
- Auto-stops at end of song

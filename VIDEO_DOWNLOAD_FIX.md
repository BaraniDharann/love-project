# Video Download Fix - Anniversary Page

## Issues Fixed

### 1. Song File Path Error
**Problem:** The posterVideoGenerator.js was looking for songs in the wrong directory path.
- Old path: `../../songs/` (looking outside backend folder)
- Correct path: `./songs/` (inside backend folder)

**Solution:** Updated posterVideoGenerator.js line 16 to use the correct path:
```javascript
const songPath = path.join(__dirname, 'songs', data.selectedSong || data.song);
```

### 2. Photo Path Handling
**Problem:** Photo paths were being converted incorrectly, causing issues with file resolution.

**Solution:** 
- Simplified photo path handling in posterVideoGenerator.js
- Photos stored as `/uploads/filename` are now correctly resolved to `backend/uploads/filename`

## How It Works Now

1. **User creates anniversary page** with 9 photos and selects a song
2. **Data is saved** with photo paths like `/uploads/1234-image.jpeg`
3. **When partner views the page** and clicks "Download Video":
   - Frontend calls `/api/generate-video/:id`
   - Backend reads the data JSON file
   - posterVideoGenerator.js:
     - Resolves song path: `backend/songs/[songname].mp3`
     - Resolves photo paths: `backend/uploads/[filename]`
     - Creates 30-second video with:
       - Photo slideshow (9 photos)
       - Selected romantic song
       - Title overlay with names
   - Video is saved to `backend/videos/[id].mp4`
   - Download link is returned to frontend

## Video Generation Features

- **Duration:** 30 seconds
- **Resolution:** 1080x1920 (vertical/portrait for mobile)
- **Photos:** Slideshow of all 9 uploaded photos
- **Audio:** Selected romantic song
- **Text Overlay:** Names of both partners with heart emoji
- **Format:** MP4 (H.264 video, AAC audio)

## Testing

To test the fix:
1. Create a new anniversary page with 9 photos
2. Select any song (including "Bejaara Aanen.mp3")
3. Share the link with partner
4. Partner opens the link and clicks "Download Video"
5. Video should generate successfully in 30 seconds

## Files Modified

1. `backend/posterVideoGenerator.js` - Fixed song and photo path resolution
2. `backend/server.js` - Simplified photo path handling

## Notes

- Video generation takes approximately 10-30 seconds depending on system performance
- Videos are cached - if the same ID is requested again, the existing video is served
- All song files with spaces in names (like "Bejaara Aanen.mp3") now work correctly

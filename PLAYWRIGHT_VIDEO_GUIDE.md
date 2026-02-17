# Playwright Video Recording - Complete Webpage Capture

## What's New? 🎬

Instead of creating a static slideshow, the system now **records the actual webpage** with ALL animations:
- ✅ Floating hearts animation
- ✅ Text fade-in effects
- ✅ Photo transitions
- ✅ Background music
- ✅ All CSS animations
- ✅ Exactly what the partner sees!

## Installation

### Step 1: Install Playwright
Run the installation script:
```bash
install-playwright.bat
```

This will:
1. Install Playwright package
2. Download Chromium browser (~100MB)

### Step 2: Start Your Servers
```bash
start.bat
```

## How It Works

### 1. User Creates Anniversary Page
- Uploads 9 photos
- Selects romantic song
- Fills in love story
- Gets shareable link

### 2. Partner Views the Page
- Opens the link
- Sees beautiful animations:
  - Hearts floating across screen
  - Names appearing with animation
  - Photos fading in one by one
  - Love story text revealing
  - Background music playing

### 3. Partner Downloads Video
- Clicks "🎬 Record & Download Video"
- System opens the webpage in headless browser
- Records 30 seconds of the actual page with all animations
- Downloads MP4 file

## Technical Details

### Video Specifications
- **Resolution:** 1080x1920 (vertical/portrait)
- **Duration:** 30 seconds
- **Format:** MP4 (WebM recorded, can be converted)
- **Captures:** Everything visible on screen including animations

### Process Flow
```
User clicks download
    ↓
Backend receives request
    ↓
Playwright launches headless Chromium
    ↓
Opens http://localhost:3000/view/{id}
    ↓
Records for 30 seconds (captures all animations)
    ↓
Saves video to backend/videos/{id}.mp4
    ↓
Returns download link to user
```

## Advantages Over FFmpeg Slideshow

| Feature | FFmpeg Slideshow | Playwright Recording |
|---------|-----------------|---------------------|
| Floating hearts | ❌ No | ✅ Yes |
| Text animations | ❌ No | ✅ Yes |
| Photo transitions | ⚠️ Basic | ✅ Full CSS |
| Background music | ✅ Yes | ✅ Yes |
| Speed | Fast (5-10s) | Medium (30s) |
| File size | Small (~5MB) | Medium (~10-15MB) |
| Accuracy | Static | 100% accurate |

## File Structure

```
backend/
├── playwrightVideoGenerator.js  ← New Playwright recorder
├── posterVideoGenerator.js      ← Old FFmpeg generator (backup)
├── server.js                    ← Updated to use Playwright
└── videos/                      ← Generated videos stored here
```

## Configuration

### Change Recording Duration
Edit `playwrightVideoGenerator.js`:
```javascript
// Wait for animations to complete (30 seconds)
await page.waitForTimeout(30000); // Change to 45000 for 45 seconds
```

### Change Video Resolution
Edit `playwrightVideoGenerator.js`:
```javascript
viewport: { width: 1080, height: 1920 }, // Change dimensions
```

## Troubleshooting

### Issue: "Playwright not found"
**Solution:** Run `install-playwright.bat`

### Issue: "Browser not installed"
**Solution:** Run `npx playwright install chromium` in backend folder

### Issue: Video is blank
**Solution:** 
- Make sure frontend is running on port 3000
- Check if animations are working in browser first

### Issue: Recording takes too long
**Solution:** 
- Reduce recording duration in playwrightVideoGenerator.js
- Use faster preset (already using fastest)

## Performance

- **First time:** ~30-35 seconds (includes browser launch)
- **Cached video:** Instant (video already exists)
- **File size:** ~10-15MB per video
- **Storage:** Videos stored in `backend/videos/`

## Future Enhancements

Possible improvements:
1. Add progress bar during recording
2. Allow custom recording duration
3. Add video quality options
4. Compress video after recording
5. Add watermark/logo

## Notes

- Videos are cached - same ID returns existing video
- Frontend must be running for recording to work
- Audio is captured from the webpage
- All CSS animations are preserved
- Works with all page types (anniversary, proposal, oneside-love)

## Testing

1. Create anniversary page with 9 photos
2. Open the view link
3. Verify all animations work
4. Click "Record & Download Video"
5. Wait 30 seconds
6. Video should download with all animations

## Comparison

**Before (FFmpeg):**
- Static slideshow
- No animations
- Fast but boring

**After (Playwright):**
- Live webpage recording
- All animations included
- Exactly what partner sees
- More engaging and romantic! 💕

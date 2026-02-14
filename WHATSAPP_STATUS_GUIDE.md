# WhatsApp Status Video Feature - Setup Guide

## 📦 Install Required Dependencies

### Backend Dependencies
```bash
cd "lover day project/backend"
npm install fluent-ffmpeg
```

### Install FFmpeg (Required for video processing)

#### Windows:
1. Download FFmpeg from: https://www.gyan.dev/ffmpeg/builds/
2. Extract to C:\ffmpeg
3. Add C:\ffmpeg\bin to System PATH
4. Restart terminal and verify: `ffmpeg -version`

#### Or use Chocolatey:
```bash
choco install ffmpeg
```

## 🎬 How It Works

1. **User creates love page** → Gets shareable link
2. **Click "Generate Status Video"** → Creates 1080x1920 vertical video (30s)
3. **Download instantly** → Ready for WhatsApp Status
4. **Share link** → Others can view and download too

## 📱 WhatsApp Status Specs
- Resolution: 1080x1920 (9:16 vertical)
- Duration: 30 seconds max
- Format: MP4 (H.264 + AAC)
- Photos: Slideshow with music
- Text: Overlay message

## 🔧 Usage Example

```javascript
// In ViewPage.js, add:
import VideoDownload from './VideoDownload';

// Inside component:
<VideoDownload pageId={id} />
```

## 🌐 API Endpoints

### Generate Video
```
POST /api/generate-video/:id
Response: { videoUrl: "http://localhost:5000/videos/xxx.mp4" }
```

### Download Video
```
GET /videos/:filename.mp4
```

## ✅ Features
- ✨ Instant video generation
- 📥 Direct download link
- 🔄 Cached videos (generates once)
- 📱 WhatsApp Status optimized
- 🎵 Background music from your songs
- 🖼️ Photo slideshow with text overlay

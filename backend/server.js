const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { generateStatusVideo } = require('./videoGenerator');
const { generateEnhancedVideo } = require('./enhancedVideoGenerator');
const { generatePosterVideo } = require('./posterVideoGenerator');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/songs', express.static(path.join(__dirname, '../../songs')));
app.use('/single-songs', express.static(path.join(__dirname, '../../songs/single songs')));

// Create required directories
const dirs = ['uploads', 'data', 'videos'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
});

app.use('/videos', express.static('videos'));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Get all songs
app.get('/api/songs', (req, res) => {
  const songsDir = path.join(__dirname, '../../songs');
  fs.readdir(songsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Cannot read songs' });
    const songs = files.filter(f => f.endsWith('.mp3')).map(f => ({
      name: f.replace('.mp3', '').replace(/-/g, ' '),
      filename: f
    }));
    res.json(songs);
  });
});

// Get single songs only
app.get('/api/single-songs', (req, res) => {
  const songsDir = path.join(__dirname, '../../songs/single songs');
  fs.readdir(songsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Cannot read single songs' });
    const songs = files.filter(f => f.endsWith('.mp3')).map(f => ({
      name: f.replace('.mp3', '').replace(/-/g, ' '),
      filename: f
    }));
    res.json(songs);
  });
});

// Upload photos
app.post('/api/upload', upload.array('photos', 10), (req, res) => {
  const files = req.files.map(f => `/uploads/${f.filename}`);
  res.json({ files });
});

// Create love page
app.post('/api/create', (req, res) => {
  const id = uuidv4();
  const data = { id, ...req.body, createdAt: new Date() };
  const dataPath = path.join(__dirname, 'data', `${id}.json`);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json({ id, link: `http://localhost:3000/view/${id}` });
});

// Get love page
app.get('/api/view/:id', (req, res) => {
  const filePath = path.join(__dirname, 'data', `${req.params.id}.json`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(data);
});

// Generate Poster Video on demand
app.get('/api/generate-video/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', `${req.params.id}.json`);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const videoName = `${req.params.id}.mp4`;
    const videoPath = path.join(__dirname, 'videos', videoName);
    
    // If video exists, return it
    if (fs.existsSync(videoPath)) {
      return res.json({ success: true, videoUrl: `http://localhost:5000/videos/${videoName}` });
    }
    
    console.log(`Generating poster video for ID: ${req.params.id}`);
    
    // Convert photo URLs to local paths
    if (data.photos && Array.isArray(data.photos)) {
      data.photos = data.photos.map(photo => {
        if (photo.startsWith('/uploads/')) {
          return path.join(__dirname, photo);
        }
        return photo;
      });
    }
    
    await generatePosterVideo(data, videoPath);
    res.json({ success: true, videoUrl: `http://localhost:5000/videos/${videoName}` });
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

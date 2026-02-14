require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { generateStatusVideo } = require('./videoGenerator');
const { generateEnhancedVideo } = require('./enhancedVideoGenerator');
const { generatePosterVideo } = require('./posterVideoGenerator');
const { generatePlaywrightVideo } = require('./playwrightVideoGenerator');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/songs', express.static(path.join(__dirname, 'songs')));

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
  const songsDir = path.join(__dirname, 'songs');
  fs.readdir(songsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Cannot read songs' });
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
  res.json({ id, link: `${FRONTEND_URL}/view/${id}` });
});

// Get love page
app.get('/api/view/:id', (req, res) => {
  const filePath = path.join(__dirname, 'data', `${req.params.id}.json`);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  res.json(data);
});

// Generate Video using Playwright (captures actual webpage with animations)
app.get('/api/generate-video/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', `${req.params.id}.json`);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Not found' });
    
    const videoName = `${req.params.id}.mp4`;
    const videoPath = path.join(__dirname, 'videos', videoName);
    
    // If video exists, return it
    if (fs.existsSync(videoPath)) {
      return res.json({ success: true, videoUrl: `http://localhost:${PORT}/videos/${videoName}` });
    }
    
    console.log(`Generating video with Playwright for ID: ${req.params.id}`);
    
    await generatePlaywrightVideo(req.params.id, videoPath);
    res.json({ success: true, videoUrl: `http://localhost:${PORT}/videos/${videoName}` });
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

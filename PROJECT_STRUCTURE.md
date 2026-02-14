# 📁 Complete Project Structure

```
lovesongsproject/
│
├── songs/                              # Your romantic songs collection
│   ├── A-Broken-Heart.mp3
│   ├── Hosanna.mp3
│   ├── Munbe Vaa.mp3
│   └── ... (32 songs total)
│
└── lover day project/                  # Main application folder
    │
    ├── backend/                        # Node.js Backend
    │   ├── server.js                   # Express server with APIs
    │   ├── package.json                # Backend dependencies
    │   ├── uploads/                    # User uploaded photos (auto-created)
    │   └── data/                       # User data storage (auto-created)
    │       └── {uuid}.json             # Individual love page data
    │
    ├── frontend/                       # React Frontend
    │   ├── public/
    │   │   └── index.html              # HTML template
    │   │
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── Home.js             # Category selection page
    │   │   │   ├── Home.css
    │   │   │   ├── LoveProposal.js     # Love proposal with jumping reject
    │   │   │   ├── LoveProposal.css
    │   │   │   ├── Anniversary.js      # Anniversary with photo gallery
    │   │   │   ├── Anniversary.css
    │   │   │   ├── OnesideLove.js      # One-side love & single
    │   │   │   ├── OnesideLove.css
    │   │   │   ├── ViewPage.js         # Shared view page
    │   │   │   ├── ViewPage.css
    │   │   │   └── FloatingHearts.js   # Hearts animation component
    │   │   │
    │   │   ├── App.js                  # Main app with routing
    │   │   ├── App.css                 # Global styles & animations
    │   │   ├── index.js                # React entry point
    │   │   └── index.css               # Base CSS
    │   │
    │   └── package.json                # Frontend dependencies
    │
    ├── package.json                    # Root package.json
    ├── start.bat                       # Windows startup script
    ├── README.md                       # Project documentation
    ├── SETUP_GUIDE.md                  # Detailed setup instructions
    └── .gitignore                      # Git ignore file
```

## 🎯 Component Flow

```
User Journey:

1. Home (/)
   ↓
   [Enter Email + Select Category]
   ↓
   ├─→ Love Proposal (/love-proposal)
   │   ↓
   │   [Proposal Page with Jumping Reject]
   │   ↓
   │   [Fill Message + Select Song]
   │   ↓
   │   [Get Shareable Link]
   │
   ├─→ Anniversary (/anniversary)
   │   ↓
   │   [Select Type: Relationship/Lovers/Marriage]
   │   ↓
   │   [Fill Details + Upload Photos + Select Song]
   │   ↓
   │   [Preview with Photo Gallery]
   │   ↓
   │   [Get Shareable Link]
   │
   └─→ One-Side Love (/oneside-love)
       ↓
       [Choose: One-Side Lover / Forever Single]
       ↓
       [Fill Details + Upload Photo + Select Song]
       ↓
       [Preview]
       ↓
       [Get Shareable Link]

Partner Opens Link:
   ↓
View Page (/view/:id)
   ↓
[Beautiful Display with Music & Animations]
```

## 🔄 API Endpoints

```
Backend APIs (http://localhost:5000):

GET  /api/songs
     → Returns list of all songs from songs folder

POST /api/upload
     → Uploads photos (max 10)
     → Returns array of file paths

POST /api/create
     → Creates love page with unique ID
     → Saves data to JSON file
     → Returns shareable link

GET  /api/view/:id
     → Retrieves love page data by ID
     → Returns JSON data

Static Routes:
GET  /uploads/*
     → Serves uploaded photos

GET  /songs/*
     → Serves song files
```

## 🎨 Key Features by Component

### Home Component
- Email validation
- Category selection with cards
- Floating hearts background
- Responsive grid layout

### LoveProposal Component
- Interactive proposal page
- Jumping reject button (5 attempts)
- Message input
- Song selection
- Link generation

### Anniversary Component
- Three anniversary types
- Form with optional fields
- Photo upload (max 10)
- Photo preview
- Preview mode with:
  - Scrolling photo gallery
  - Heart-shaped middle photo
  - Love story display
- Link generation

### OnesideLove Component
- Two modes: One-Side / Single
- Different forms for each mode
- Photo upload
- Bio and quote fields
- Preview mode
- Link generation

### ViewPage Component
- Dynamic rendering based on type
- Music player with controls
- Floating hearts animation
- Responsive layout
- Auto-play music
- Photo galleries

### FloatingHearts Component
- Reusable animation component
- Configurable heart count
- Random positioning
- Smooth floating animation

## 🎵 Music Player Features

- Play/Pause control
- Song name display
- Lyrics toggle button (placeholder)
- Fixed position at bottom
- Responsive design
- Auto-play on view page

## 💾 Data Storage

Each love page is stored as:
```json
{
  "id": "unique-uuid",
  "type": "love-proposal | anniversary | oneside-love",
  "email": "user@example.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  ... (type-specific fields)
}
```

## 🎨 Color Schemes

- **Love Proposal**: Pink gradient (#ffecd2 → #fcb69f → #ff9a9e)
- **Anniversary**: Warm pink gradient
- **One-Side Love**: Cool gradient (#a8edea → #fed6e3)
- **Buttons**: Pink to red gradient
- **Hearts**: Hot pink (#ff69b4)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

All components adapt layout and font sizes accordingly.

## ⚡ Performance Features

- Lazy loading of images
- Optimized animations
- Efficient re-renders
- Local storage for email
- Minimal API calls

## 🔒 Security Considerations

- File size limits (10MB per photo)
- File type validation (images only)
- Email validation
- UUID for unique IDs
- CORS enabled for local development

---

This structure provides a complete, scalable, and maintainable romantic web application! 💕

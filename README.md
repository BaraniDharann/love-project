# 💖 Love Day Project 💖

A romantic web application built with React and Node.js to express love, celebrate anniversaries, and share feelings with beautiful animations and music.

## ✨ Features

### 1. Love Proposal 💕
- Express your feelings to your partner
- Interactive accept/reject buttons (reject button jumps away!)
- Dedicated romantic songs
- Floating hearts animation
- Beautiful pink gradient background

### 2. Anniversary Celebration 💑
- Three types: Relationship / Lovers / Marriage Anniversary
- Add partner names and love story
- Upload up to 10 photos
- Photos displayed in romantic scrolling gallery
- Special heart-shaped photo frame for one memory
- Background music with lyrics option
- Shareable link to send to partner

### 3. One-Side Love 💔
- Two options: One-Side Lover / Forever Single
- Express feelings with words
- Upload photos with stylish effects
- Add personal quotes and bio
- Romantic background music

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd "c:\Users\BaranidharanThiruven\Pictures\lovesongsproject\lover day project\backend"
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Server will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd "c:\Users\BaranidharanThiruven\Pictures\lovesongsproject\lover day project\frontend"
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

App will open on http://localhost:3000

## 📁 Project Structure

```
lover day project/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json
│   ├── uploads/           # Uploaded photos
│   └── data/              # User data storage
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Home.js              # Category selection
│       │   ├── LoveProposal.js      # Proposal page
│       │   ├── Anniversary.js       # Anniversary page
│       │   ├── OnesideLove.js       # One-side love page
│       │   ├── ViewPage.js          # Shared view page
│       │   └── FloatingHearts.js    # Hearts animation
│       ├── App.js
│       ├── App.css
│       └── index.js
└── songs/                 # Your romantic songs collection
```

## 🎵 Songs

Place your romantic MP3 songs in the `songs` folder. The app will automatically detect and list them.

## 🎨 Features Highlights

- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Floating Hearts**: Beautiful heart animations floating from bottom to top
- **Jumping Reject Button**: Fun interactive button that jumps away when trying to reject
- **Photo Gallery**: Romantic scrolling photo gallery with special heart-shaped frame
- **Music Player**: Built-in music player with play/pause and lyrics toggle
- **Shareable Links**: Generate unique links to share with your partner
- **Preview Mode**: Preview your creation before sharing
- **Email Validation**: Required email for all categories

## 🌈 Color Themes

- **Love Proposal**: Pink gradient (#ffecd2 → #fcb69f → #ff9a9e)
- **Anniversary**: Warm pink gradient
- **One-Side Love**: Cool gradient (#a8edea → #fed6e3)

## 💝 Usage

1. Enter your email on the home page
2. Select a category (Love Proposal / Anniversary / One-Side Love)
3. Fill in the details and upload photos (optional)
4. Select a romantic song
5. Preview your creation
6. Confirm and get a shareable link
7. Send the link to your partner
8. They'll see your romantic message with music and animations!

## 🛠️ Technologies Used

- **Frontend**: React 18, React Router, Framer Motion, Axios
- **Backend**: Node.js, Express, Multer
- **Styling**: CSS3 with animations and gradients
- **File Upload**: Multer for photo uploads
- **Unique IDs**: UUID for generating shareable links

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- 📱 Mobile phones
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

## 🎭 Animations

- Floating hearts from bottom to top
- Fade-in and scale animations
- Heart pulse animation
- Smooth transitions
- Interactive button animations

## 🔒 Data Storage

User data is stored locally in JSON files in the `backend/data` folder. Each creation gets a unique ID for sharing.

## 🎉 Enjoy!

Create beautiful romantic experiences and share them with your loved ones! 💕

---

Made with ❤️ for expressing love in the digital age

# 🚀 Quick Start Guide - Love Day Project

## Method 1: Using the Batch Script (Easiest)

1. Double-click `start.bat` file
2. Wait for both servers to start automatically
3. Your browser will open at http://localhost:3000

## Method 2: Manual Setup

### Step 1: Install Backend Dependencies

Open Command Prompt and run:

```bash
cd "c:\Users\BaranidharanThiruven\Pictures\lovesongsproject\lover day project\backend"
npm install
```

### Step 2: Install Frontend Dependencies

```bash
cd "c:\Users\BaranidharanThiruven\Pictures\lovesongsproject\lover day project\frontend"
npm install
```

### Step 3: Start Backend Server

Open a new Command Prompt:

```bash
cd "c:\Users\BaranidharanThiruven\Pictures\lovesongsproject\lover day project\backend"
npm start
```

Keep this window open. Backend runs on http://localhost:5000

### Step 4: Start Frontend Server

Open another Command Prompt:

```bash
cd "c:\Users\BaranidharanThiruven\Pictures\lovesongsproject\lover day project\frontend"
npm start
```

Frontend will open automatically at http://localhost:3000

## 🎯 How to Use

### 1. Love Proposal 💕

1. Enter your email
2. Select "Love Proposal"
3. Your partner sees the proposal page
4. Try clicking "Reject" - it jumps away! 😊
5. After 5 attempts, it converts to "Accept"
6. Click "Accept" to see your message
7. Fill in your message and select a song
8. Get a shareable link
9. Send it to your partner!

### 2. Anniversary 💑

1. Enter your email
2. Select "Anniversary"
3. Choose type: Relationship / Lovers / Marriage
4. Fill in:
   - Your name & partner's name
   - Meeting place (optional)
   - Who proposed first (optional)
   - Your love story
5. Select a romantic song
6. Upload up to 10 photos (optional)
7. Preview your creation
8. Confirm and get the link
9. Share with your partner!

**Special Feature**: The middle photo appears in a heart shape! 💖

### 3. One-Side Love 💔

#### Option A: One-Side Lover
1. Enter partner's name
2. Write your feelings
3. Upload a photo (optional)
4. Select a song
5. Preview and share

#### Option B: Forever Single
1. Upload your photo
2. Add your bio
3. Add a quote
4. Select a song
5. Preview and share

## 🎵 Adding Songs

1. Place your MP3 files in the `songs` folder
2. Songs will automatically appear in the dropdown
3. Supported format: MP3

Current songs folder location:
```
c:\Users\BaranidharanThiruven\Pictures\lovesongsproject\songs\
```

## 🎨 Features

✅ Floating hearts animation
✅ Responsive design (mobile, tablet, desktop)
✅ Jumping reject button
✅ Photo gallery with heart-shaped frame
✅ Music player with play/pause
✅ Preview before sharing
✅ Unique shareable links
✅ Email validation
✅ Beautiful gradients and animations

## 🐛 Troubleshooting

### Port Already in Use

If you see "Port 3000 is already in use":
- Press `Y` to use a different port
- Or close other apps using port 3000

If you see "Port 5000 is already in use":
- Close other apps using port 5000
- Or change the port in `backend/server.js`

### Cannot Find Module

Run:
```bash
npm install
```
in both backend and frontend folders

### Photos Not Uploading

Make sure the `backend/uploads` folder exists. It's created automatically when you start the backend.

### Songs Not Playing

1. Check if songs are in the `songs` folder
2. Make sure they are MP3 format
3. Check browser console for errors

## 📱 Mobile Access

To access from your phone on the same network:

1. Find your computer's IP address:
```bash
ipconfig
```
Look for "IPv4 Address"

2. On your phone, open:
```
http://YOUR_IP_ADDRESS:3000
```

Example: http://192.168.1.100:3000

## 🎉 Tips for Best Experience

1. **Use high-quality photos** for better visual appeal
2. **Choose romantic songs** that match the mood
3. **Write heartfelt messages** - be genuine!
4. **Preview before sharing** to check everything looks perfect
5. **Test the link** before sending to your partner

## 💝 Creating the Perfect Love Page

### For Proposals:
- Keep message short and sweet
- Choose a meaningful song
- The reject button adds fun - your partner will love it!

### For Anniversaries:
- Tell your complete love story
- Upload photos from different moments
- The middle photo will be heart-shaped - choose wisely!
- Mention special places and moments

### For One-Side Love:
- Be honest and genuine
- Choose a song that expresses your feelings
- A photo adds personal touch

### For Forever Single:
- Show your personality
- Use a stylish photo
- Add a powerful quote

## 🔗 Sharing Links

Links look like:
```
http://localhost:3000/view/abc123-def456-ghi789
```

When your partner opens it:
- Music plays automatically
- Hearts float in the background
- All your content displays beautifully
- They can control the music player

## 🎊 Enjoy Creating Love!

Remember: The best love expressions come from the heart. Use this tool to amplify your feelings with beautiful visuals and music! 💕

---

Need help? Check the README.md for more details!

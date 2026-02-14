# 🔧 Troubleshooting Guide - Love Day Project

## 🚨 Common Issues & Solutions

---

## 1. Installation Issues

### ❌ "npm: command not found"

**Problem**: Node.js is not installed

**Solution**:
1. Download Node.js from https://nodejs.org/
2. Install LTS version (recommended)
3. Restart Command Prompt
4. Verify: `node --version` and `npm --version`

---

### ❌ "Cannot find module"

**Problem**: Dependencies not installed

**Solution**:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

---

### ❌ "EACCES: permission denied"

**Problem**: Permission issues

**Solution** (Windows):
1. Run Command Prompt as Administrator
2. Or change npm directory:
```bash
npm config set prefix %APPDATA%\npm
```

---

## 2. Server Issues

### ❌ "Port 5000 is already in use"

**Problem**: Another app is using port 5000

**Solution 1** - Change Backend Port:
1. Open `backend/server.js`
2. Change line: `const PORT = 5000;`
3. To: `const PORT = 5001;` (or any free port)
4. Update frontend API calls to use new port

**Solution 2** - Kill Process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

---

### ❌ "Port 3000 is already in use"

**Problem**: Another app is using port 3000

**Solution 1** - Use Different Port:
- When prompted, press `Y` to use different port
- App will run on port 3001 or next available

**Solution 2** - Kill Process:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

---

### ❌ "Cannot GET /"

**Problem**: Frontend not running or wrong URL

**Solution**:
1. Ensure frontend is running: `npm start` in frontend folder
2. Check URL: Should be `http://localhost:3000`
3. Clear browser cache
4. Try incognito/private mode

---

## 3. API/Connection Issues

### ❌ "Network Error" or "Failed to fetch"

**Problem**: Backend not running or CORS issue

**Solution**:
1. Ensure backend is running on port 5000
2. Check backend terminal for errors
3. Verify CORS is enabled in `server.js`
4. Check firewall settings

---

### ❌ "404 Not Found" on API calls

**Problem**: Wrong API endpoint or backend not running

**Solution**:
1. Verify backend is running: `http://localhost:5000`
2. Check API endpoint URLs in frontend code
3. Ensure all routes are defined in `server.js`

---

## 4. Photo Upload Issues

### ❌ Photos not uploading

**Problem**: File size too large or wrong format

**Solution**:
1. Check file size (max 10MB per photo)
2. Use JPG, PNG, or GIF format
3. Ensure `uploads` folder exists in backend
4. Check backend terminal for errors

---

### ❌ "Multer Error: Unexpected field"

**Problem**: Wrong field name in upload

**Solution**:
1. Ensure field name is 'photos' in frontend
2. Check multer configuration in `server.js`
3. Verify form data is sent correctly

---

### ❌ Photos not displaying

**Problem**: Wrong path or CORS issue

**Solution**:
1. Check image URL in browser console
2. Verify path: `http://localhost:5000/uploads/filename.jpg`
3. Ensure static middleware is configured
4. Check file permissions

---

## 5. Song/Music Issues

### ❌ Songs not appearing in dropdown

**Problem**: Songs folder path incorrect

**Solution**:
1. Verify songs folder location:
   ```
   c:\Users\BaranidharanThiruven\Pictures\lovesongsproject\songs\
   ```
2. Check `server.js` path to songs folder
3. Ensure songs are MP3 format
4. Restart backend server

---

### ❌ Music not playing

**Problem**: Wrong path or unsupported format

**Solution**:
1. Ensure songs are MP3 format
2. Check browser console for errors
3. Verify song path: `http://localhost:5000/songs/songname.mp3`
4. Try different browser
5. Check audio element in DevTools

---

### ❌ "Failed to load resource" for songs

**Problem**: Path issue or file not found

**Solution**:
1. Check song filename (case-sensitive)
2. Verify static route in `server.js`
3. Ensure songs folder is accessible
4. Check file permissions

---

## 6. UI/Display Issues

### ❌ Floating hearts not appearing

**Problem**: CSS not loaded or component issue

**Solution**:
1. Check browser console for errors
2. Verify FloatingHearts component is imported
3. Clear browser cache
4. Check CSS animations are supported

---

### ❌ Styles not applying

**Problem**: CSS not loaded

**Solution**:
1. Check if CSS files are imported in components
2. Clear browser cache (Ctrl + Shift + Delete)
3. Hard refresh (Ctrl + F5)
4. Check browser DevTools for CSS errors

---

### ❌ Responsive design not working

**Problem**: Viewport meta tag missing

**Solution**:
1. Check `index.html` has viewport meta tag:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1" />
   ```
2. Test in browser DevTools responsive mode
3. Clear cache and reload

---

## 7. Animation Issues

### ❌ Animations not smooth

**Problem**: Performance issue

**Solution**:
1. Close other browser tabs
2. Update browser to latest version
3. Reduce number of floating hearts
4. Check GPU acceleration is enabled

---

### ❌ Jumping button not working

**Problem**: JavaScript error or CSS issue

**Solution**:
1. Check browser console for errors
2. Verify CSS variables are set
3. Test in different browser
4. Check event handlers are attached

---

## 8. Link Sharing Issues

### ❌ Link not working

**Problem**: ID not found or server not running

**Solution**:
1. Ensure backend is running
2. Check if data file exists in `backend/data/`
3. Verify link format: `http://localhost:3000/view/{id}`
4. Check browser console for errors

---

### ❌ "Page not found" on shared link

**Problem**: Wrong URL or routing issue

**Solution**:
1. Verify React Router is configured
2. Check ViewPage component route
3. Ensure ID is valid UUID
4. Test link in incognito mode

---

## 9. Mobile Issues

### ❌ App not accessible on mobile

**Problem**: Network configuration

**Solution**:
1. Ensure phone and computer on same WiFi
2. Find computer IP: `ipconfig`
3. Use IP instead of localhost: `http://192.168.1.X:3000`
4. Check firewall allows connections

---

### ❌ Touch interactions not working

**Problem**: Touch events not handled

**Solution**:
1. Test in mobile browser DevTools
2. Ensure touch events are supported
3. Check for JavaScript errors
4. Update mobile browser

---

## 10. Data/Storage Issues

### ❌ Data not saving

**Problem**: File write permissions

**Solution**:
1. Check `backend/data/` folder exists
2. Verify write permissions
3. Check disk space
4. Review backend terminal for errors

---

### ❌ "Cannot read property" errors

**Problem**: Data structure mismatch

**Solution**:
1. Check JSON file structure
2. Verify all required fields are present
3. Check for null/undefined values
4. Add error handling in code

---

## 11. Browser-Specific Issues

### ❌ Works in Chrome but not Firefox/Safari

**Problem**: Browser compatibility

**Solution**:
1. Check browser console for specific errors
2. Verify CSS prefixes for animations
3. Test audio format support
4. Update browser to latest version

---

### ❌ "Blocked by CORS policy"

**Problem**: CORS not configured

**Solution**:
1. Verify CORS is enabled in `server.js`:
   ```javascript
   app.use(cors());
   ```
2. Restart backend server
3. Clear browser cache

---

## 12. Performance Issues

### ❌ App running slow

**Problem**: Too many animations or large files

**Solution**:
1. Reduce number of floating hearts
2. Optimize image sizes before upload
3. Close other applications
4. Clear browser cache
5. Use production build for deployment

---

### ❌ High memory usage

**Problem**: Memory leak or large files

**Solution**:
1. Restart browser
2. Optimize images
3. Check for console errors
4. Update dependencies

---

## 🔍 Debugging Tips

### Check Browser Console
```
F12 → Console tab
Look for red error messages
```

### Check Network Tab
```
F12 → Network tab
See failed requests
Check response codes
```

### Check Backend Terminal
```
Look for error messages
Check request logs
Verify server is running
```

### Test API Directly
```
Open: http://localhost:5000/api/songs
Should return JSON with songs list
```

### Verify File Structure
```
Ensure all files are in correct locations
Check folder names (case-sensitive)
Verify imports are correct
```

---

## 🛠️ Advanced Troubleshooting

### Clear Everything and Restart

```bash
# Delete node_modules
cd backend
rmdir /s node_modules
cd ../frontend
rmdir /s node_modules

# Delete package-lock.json
del package-lock.json (in both folders)

# Reinstall
cd backend
npm install
cd ../frontend
npm install

# Restart servers
```

---

### Check Versions

```bash
node --version    # Should be v14+
npm --version     # Should be v6+
```

---

### Verify Dependencies

```bash
# Backend
cd backend
npm list

# Frontend
cd frontend
npm list
```

---

## 📞 Still Having Issues?

### Checklist:
- [ ] Node.js installed (v14+)
- [ ] Both servers running
- [ ] No port conflicts
- [ ] All dependencies installed
- [ ] Songs folder accessible
- [ ] Browser console checked
- [ ] Backend terminal checked
- [ ] Correct URLs used
- [ ] Firewall not blocking
- [ ] Latest browser version

---

## 🎯 Quick Fixes Summary

| Issue | Quick Fix |
|-------|-----------|
| Port in use | Change port or kill process |
| Module not found | Run `npm install` |
| Photos not uploading | Check file size & format |
| Songs not playing | Verify MP3 format & path |
| Styles not working | Clear cache, hard refresh |
| Link not working | Check backend running |
| Mobile not working | Use IP address |
| Slow performance | Reduce animations |

---

## 💡 Prevention Tips

1. **Always check both terminals** for errors
2. **Use browser DevTools** to debug
3. **Test in incognito mode** to avoid cache issues
4. **Keep dependencies updated** regularly
5. **Backup data folder** before major changes
6. **Test on multiple browsers** before sharing
7. **Optimize images** before uploading
8. **Use correct file formats** (MP3 for audio, JPG/PNG for images)

---

## 🎉 Success Indicators

✅ Backend shows: "Server running on http://localhost:5000"
✅ Frontend opens automatically in browser
✅ Home page displays with floating hearts
✅ Songs appear in dropdown
✅ Photos upload successfully
✅ Music plays on view page
✅ Links generate and work
✅ Responsive on mobile

---

## 📚 Additional Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **React Docs**: https://react.dev/
- **Express Docs**: https://expressjs.com/
- **MDN Web Docs**: https://developer.mozilla.org/

---

**If all else fails**: Delete everything, re-download, and start fresh! 🔄

**Remember**: Most issues are solved by:
1. Restarting servers
2. Clearing cache
3. Reinstalling dependencies
4. Checking console errors

---

Made with ❤️ - Happy Debugging! 🐛✨

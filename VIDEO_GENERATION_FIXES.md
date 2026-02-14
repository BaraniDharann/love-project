# Video Generation Troubleshooting & Fixes

## Issues Fixed

### 1. **Directory Creation Error**
**Problem**: `[WinError 2] The system cannot find the file specified`
- The output directory didn't exist when Python tried to save the video

**Solution**: 
- Added automatic directory creation in `capture_video.py`
- Updated `enhancedVideoGenerator.js` to create output directories
- Updated `server.js` to ensure all directories exist on startup

### 2. **Exit Code Handling**
**Problem**: Python script exit code wasn't being properly checked
- Node.js was checking for file existence but not properly handling Python errors

**Solution**:
- Added explicit `sys.exit(0)` on success and `sys.exit(1)` on failure
- Updated Node.js to check exit code before checking file existence
- Added better error messages for debugging

### 3. **Audio File Validation**
**Problem**: Script didn't verify audio file exists before processing

**Solution**:
- Added file existence check in Python script
- Added song path validation in Node.js generator

### 4. **FFmpeg Output Overwrite**
**Problem**: FFmpeg might fail if output file already exists

**Solution**:
- Added `-y` flag to FFmpeg commands to overwrite existing files

## Testing Video Generation

### For All Three Video Types:

1. **Status Video (with photos)**
   - Upload photos
   - Select a song
   - Click "Generate Video"
   - Check `/backend/videos/` for the MP4 file

2. **Enhanced Video (screen capture)**
   - Create a love page
   - Click "Generate Video"
   - Keep browser window visible during capture
   - Video will be saved to `/backend/videos/`

3. **Single Song Video**
   - Select from "Single Songs" category
   - Generate video
   - Should work same as other types

## Verification Steps

1. **Check directories exist**:
   ```
   backend/
   ├── uploads/
   ├── data/
   └── videos/
   ```

2. **Verify Python script**:
   - Test manually: `python capture_video.py http://localhost:3000/view/test-id path/to/song.mp3 output.mp4`

3. **Check logs**:
   - Look at Node.js console for "Generating video for ID: ..."
   - Look for Python output messages

4. **Verify video file**:
   - Check if MP4 file exists in `/backend/videos/`
   - Try playing it to confirm it has both video and audio

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Python script failed with code 1" | Check audio file path exists, verify FFmpeg is installed |
| Video file not created | Ensure browser window is visible during capture, check FFmpeg installation |
| No audio in video | Verify audio file path is correct and file is valid MP3 |
| "Cannot find file specified" | Ensure all directories are created, check path permissions |

## Requirements

- Python 3.x installed
- FFmpeg installed and in PATH
- Node.js and npm
- Browser window must be visible during screen capture

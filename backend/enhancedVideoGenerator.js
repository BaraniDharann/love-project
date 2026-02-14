const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const generateEnhancedVideo = async (data, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Get song path
      const songPath = data.songFolder === 'single-songs'
        ? path.join(__dirname, '../../songs/single songs', data.selectedSong)
        : path.join(__dirname, '../../songs', data.selectedSong || data.song);
      
      // Validate song file exists
      if (!fs.existsSync(songPath)) {
        return reject(new Error(`Song file not found: ${songPath}`));
      }

      // Get photos or use placeholder
      const photos = data.photos && data.photos.length > 0 
        ? data.photos.map(p => p.startsWith('http') ? p : path.join(__dirname, p))
        : [];

      // Get text
      const text = (data.message || data.text || 'Love Message').substring(0, 100);

      // If photos exist, create slideshow video
      if (photos.length > 0) {
        const duration = 30;
        const photoDuration = duration / photos.length;
        let filterComplex = '';
        let inputs = [];

        photos.forEach((photo, i) => {
          inputs.push(photo);
          filterComplex += `[${i}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30,format=yuv420p[v${i}];`;
        });

        filterComplex += photos.map((_, i) => `[v${i}]`).join('') +
          `concat=n=${photos.length}:v=1:a=0:duration=${photoDuration}[outv];` +
          `[outv]drawtext=text='${text.replace(/'/g, "\\'")}':fontcolor=white:fontsize=60:x=(w-text_w)/2:y=h-100:shadowcolor=black:shadowx=2:shadowy=2[finalv]`;

        const cmd = ffmpeg();
        inputs.forEach(input => cmd.input(input));
        cmd.input(songPath)
          .complexFilter(filterComplex)
          .outputOptions([
            '-map [finalv]',
            '-map ' + photos.length + ':a',
            '-t ' + duration,
            '-c:v libx264',
            '-preset fast',
            '-c:a aac',
            '-b:a 128k',
            '-shortest'
          ])
          .output(outputPath)
          .on('end', () => resolve(outputPath))
          .on('error', reject)
          .run();
      } else {
        // Create video with just audio and text overlay
        ffmpeg()
          .input(songPath)
          .inputOptions(['-t 30'])
          .complexFilter([
            `color=c=#ff9a9e:s=1080x1920:d=30[bg]`,
            `[bg]drawtext=text='${text.replace(/'/g, "\\'")}':fontcolor=white:fontsize=50:x=(w-text_w)/2:y=(h-text_h)/2:shadowcolor=black:shadowx=3:shadowy=3[v]`
          ])
          .outputOptions([
            '-map [v]',
            '-map 0:a',
            '-c:v libx264',
            '-preset fast',
            '-c:a aac',
            '-b:a 128k',
            '-shortest'
          ])
          .output(outputPath)
          .on('end', () => resolve(outputPath))
          .on('error', reject)
          .run();
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generateEnhancedVideo };

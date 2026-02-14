const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

const generatePosterVideo = async (data, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const songPath = path.join(__dirname, 'songs', data.selectedSong || data.song);

      if (!fs.existsSync(songPath)) {
        return reject(new Error(`Song file not found: ${songPath}`));
      }

      const photos = data.photos && data.photos.length > 0
        ? data.photos.filter(p => {
            const photoPath = p.startsWith('/uploads/') ? path.join(__dirname, p) : p;
            return fs.existsSync(photoPath);
          }).map(p => p.startsWith('/uploads/') ? path.join(__dirname, p) : p)
        : [];

      const title = data.userName && data.partnerName 
        ? `${data.userName} ❤ ${data.partnerName}`
        : data.message || data.partnerName || 'Love Message';

      const subtitle = (data.loveStory || data.feelings || '').substring(0, 80);

      if (photos.length > 0) {
        // Create slideshow with photos
        const duration = 30;
        const photoDuration = duration / photos.length;
        let filterComplex = '';

        photos.forEach((photo, i) => {
          filterComplex += `[${i}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30[v${i}];`;
        });

        filterComplex += photos.map((_, i) => `[v${i}]`).join('') +
          `concat=n=${photos.length}:v=1:a=0[outv];` +
          `[outv]drawtext=text='${title.replace(/'/g, "\\'")}':fontcolor=white:fontsize=60:x=(w-text_w)/2:y=100:shadowcolor=black:shadowx=3:shadowy=3[finalv]`;

        const cmd = ffmpeg();
        photos.forEach(photo => cmd.input(photo));
        cmd.input(songPath)
          .complexFilter(filterComplex)
          .outputOptions([
            '-map [finalv]',
            `-map ${photos.length}:a`,
            '-t 30',
            '-c:v libx264',
            '-preset ultrafast',
            '-c:a aac',
            '-b:a 128k'
          ])
          .output(outputPath)
          .on('end', () => resolve(outputPath))
          .on('error', reject)
          .run();
      } else {
        // Create video with just background and text
        const titleEsc = title.replace(/'/g, "\\'");
        const subtitleEsc = subtitle.replace(/'/g, "\\'");

        let drawtext = `drawtext=text='${titleEsc}':fontcolor=white:fontsize=50:x=(w-text_w)/2:y=(h-text_h)/2:shadowcolor=black:shadowx=3:shadowy=3`;
        
        if (subtitleEsc) {
          drawtext += `,drawtext=text='${subtitleEsc}':fontcolor=white:fontsize=30:x=(w-text_w)/2:y=(h-text_h)/2+100:shadowcolor=black:shadowx=2:shadowy=2`;
        }

        ffmpeg()
          .input(songPath)
          .inputOptions(['-t 30'])
          .complexFilter([
            `color=c=#ff9a9e:s=1080x1920:d=30[bg]`,
            `[bg]${drawtext}[v]`
          ])
          .outputOptions([
            '-map [v]',
            '-map 0:a',
            '-c:v libx264',
            '-preset ultrafast',
            '-c:a aac',
            '-b:a 128k'
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

module.exports = { generatePosterVideo };

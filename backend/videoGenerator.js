const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);

// Generate WhatsApp Status Video (1080x1920, max 30s)
const generateStatusVideo = async (photos, song, outputPath, text) => {
  return new Promise((resolve, reject) => {
    const duration = 30;
    
    // If no photos, create audio-only video with text
    if (!photos || photos.length === 0) {
      ffmpeg()
        .input(song)
        .inputOptions(['-t 30'])
        .complexFilter([
          `color=c=#ff9a9e:s=1080x1920:d=30[bg]`,
          `[bg]drawtext=text='${text.replace(/'/g, "\\'").substring(0, 100)}':fontcolor=white:fontsize=50:x=(w-text_w)/2:y=(h-text_h)/2:shadowcolor=black:shadowx=3:shadowy=3[v]`
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
      return;
    }
    
    const photoDuration = duration / photos.length;
    let filterComplex = '';
    let inputs = [];
    
    photos.forEach((photo, i) => {
      inputs.push(photo);
      filterComplex += `[${i}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30,format=yuv420p[v${i}];`;
    });
    
    filterComplex += photos.map((_, i) => `[v${i}]`).join('') + 
      `concat=n=${photos.length}:v=1:a=0:duration=${photoDuration}[outv];` +
      `[outv]drawtext=text='${text.replace(/'/g, "\\'").substring(0, 100)}':fontcolor=white:fontsize=60:x=(w-text_w)/2:y=h-100:shadowcolor=black:shadowx=2:shadowy=2[finalv]`;
    
    const cmd = ffmpeg();
    inputs.forEach(input => cmd.input(input));
    cmd.input(song)
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
  });
};

module.exports = { generateStatusVideo };

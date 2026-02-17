const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const generatePlaywrightVideo = async (id, outputPath) => {
  let browser;
  let context;
  try {
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('Launching browser...');
    browser = await chromium.launch({ 
      headless: true,
      args: ['--autoplay-policy=no-user-gesture-required']
    });
    
    console.log('Creating context with video recording...');
    context = await browser.newContext({
      viewport: { width: 1080, height: 1920 },
      recordVideo: {
        dir: outputDir,
        size: { width: 1080, height: 1920 }
      }
    });

    const page = await context.newPage();
    
    console.log(`Navigating to ${FRONTEND_URL}/view/${id}`);
    await page.goto(`${FRONTEND_URL}/view/${id}`, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });

    // Wait for page to load and trigger audio
    await page.waitForTimeout(3000);
    
    // Force audio to play
    await page.evaluate(() => {
      const audio = document.querySelector('audio');
      if (audio) {
        audio.muted = false;
        audio.volume = 1.0;
        audio.play().catch(e => console.log('Audio play error:', e));
      }
    });

    console.log('Recording for 30 seconds...');
    await page.waitForTimeout(27000);

    console.log('Closing page and saving video...');
    await page.close();
    
    // Get video path before closing context
    const pages = context.pages();
    const videoPath = await (pages[0] || page).video()?.path();
    
    await context.close();
    await browser.close();
    
    console.log('Video saved, moving to final location...');
    // Find the generated video file
    const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.webm'));
    if (files.length > 0) {
      const generatedVideo = path.join(outputDir, files[files.length - 1]);
      if (generatedVideo !== outputPath) {
        // Convert .webm to .mp4 name
        const mp4Path = outputPath.replace('.mp4', '.webm');
        fs.renameSync(generatedVideo, mp4Path);
        // Rename to .mp4 for compatibility
        fs.renameSync(mp4Path, outputPath);
      }
    }

    console.log('Video generation complete!');
    return outputPath;
  } catch (error) {
    console.error('Error generating video:', error);
    if (context) await context.close();
    if (browser) await browser.close();
    throw error;
  }
};

module.exports = { generatePlaywrightVideo };

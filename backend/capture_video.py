import subprocess
import os
import sys
from pathlib import Path
import time

def capture_webpage_to_video(page_url, output_video, duration=30):
    """Capture webpage as video using FFmpeg"""
    
    # Ensure output directory exists
    output_dir = os.path.dirname(output_video)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir, exist_ok=True)
    
    # FFmpeg command to capture screen
    ffmpeg_cmd = [
        'ffmpeg',
        '-f', 'gdigrab',
        '-framerate', '30',
        '-t', str(duration),
        '-i', 'desktop',
        '-c:v', 'libx264',
        '-preset', 'ultrafast',
        '-crf', '28',
        '-pix_fmt', 'yuv420p',
        '-y',
        output_video
    ]
    
    try:
        subprocess.run(ffmpeg_cmd, check=True, capture_output=True, text=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"FFmpeg Error: {e.stderr}")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

def add_audio_to_video(video_path, audio_path, output_path):
    """Add audio to video"""
    ffmpeg_cmd = [
        'ffmpeg',
        '-i', video_path,
        '-i', audio_path,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-map', '0:v:0',
        '-map', '1:a:0',
        '-shortest',
        '-y',
        output_path
    ]
    
    try:
        subprocess.run(ffmpeg_cmd, check=True, capture_output=True, text=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"FFmpeg Error: {e.stderr}")
        return False
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == '__main__':
    if len(sys.argv) < 4:
        print("Usage: python capture_video.py <page_url> <audio_path> <output_video>")
        sys.exit(1)
    
    page_url = sys.argv[1]
    audio_path = sys.argv[2]
    output_video = sys.argv[3]
    
    print(f"Capturing {page_url} to {output_video}")
    print("Please keep the browser window in focus and visible!")
    
    # Verify audio file exists
    if not os.path.exists(audio_path):
        print(f"Error: Audio file not found: {audio_path}")
        sys.exit(1)
    
    # Capture video
    if capture_webpage_to_video(page_url, output_video, 30):
        print("Video captured successfully")
        
        # Add audio
        temp_video = output_video.replace('.mp4', '_temp.mp4')
        os.rename(output_video, temp_video)
        
        if add_audio_to_video(temp_video, audio_path, output_video):
            os.remove(temp_video)
            print(f"Video with audio saved to {output_video}")
            sys.exit(0)
        else:
            print("Failed to add audio")
            sys.exit(1)
    else:
        print("Failed to capture video")
        sys.exit(1)

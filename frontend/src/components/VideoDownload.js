import React, { useState } from 'react';
import axios from 'axios';
import './VideoDownload.css';

const VideoDownload = ({ pageId }) => {
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const generateVideo = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`http://localhost:5000/api/generate-video/${pageId}`);
      setVideoUrl(res.data.videoUrl);
    } catch (error) {
      alert('Error generating video: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="video-download">
      <h3>📱 WhatsApp Status Video</h3>
      {!videoUrl ? (
        <button onClick={generateVideo} disabled={loading} className="generate-btn">
          {loading ? '⏳ Generating...' : '🎬 Generate Status Video'}
        </button>
      ) : (
        <div className="video-ready">
          <p>✅ Video Ready!</p>
          <a href={videoUrl} download className="download-btn">
            ⬇️ Download for WhatsApp Status
          </a>
          <video src={videoUrl} controls className="preview-video" />
        </div>
      )}
      <p className="info">Format: 1080x1920 (Vertical) | Duration: 30s</p>
    </div>
  );
};

export default VideoDownload;

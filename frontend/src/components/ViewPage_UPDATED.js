import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewPage.css';

const ViewPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const videoUrl = `http://localhost:5000/videos/${id}.mp4`;

  useEffect(() => {
    axios.get(`http://localhost:5000/api/view/${id}`)
      .then(res => setData(res.data))
      .catch(err => alert('Page not found'));
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('✅ Link copied!');
  };

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="view-page">
      <h1>💕 {data.name || 'Love Memories'}</h1>
      
      <div className="photo-gallery">
        {data.photos?.map((photo, i) => (
          <img key={i} src={`http://localhost:5000${photo}`} alt={`Memory ${i+1}`} />
        ))}
      </div>

      {data.message && <div className="message-box"><p>{data.message}</p></div>}

      <div className="share-section">
        <h3>🔗 Share This Page</h3>
        <input type="text" value={window.location.href} readOnly />
        <button onClick={copyLink}>📋 Copy</button>
      </div>

      <div className="video-section">
        <h3>📱 Download WhatsApp Status Video</h3>
        <a href={videoUrl} download className="download-btn">
          ⬇️ Download Video
        </a>
      </div>

      {data.song && (
        <div className="music-player">
          <h3>🎵 Background Music</h3>
          <audio controls src={`http://localhost:5000/songs/${data.song}`} />
        </div>
      )}
    </div>
  );
};

export default ViewPage;

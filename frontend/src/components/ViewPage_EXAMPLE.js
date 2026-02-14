import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoDownload from './VideoDownload';
import './ViewPage.css';

const ViewPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/view/${id}`)
      .then(res => {
        setData(res.data);
        setShareLink(window.location.href);
      })
      .catch(err => alert('Page not found'));
  }, [id]);

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('✅ Link copied! Share it now!');
  };

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="view-page">
      <h1>💕 {data.name || 'Love Memories'}</h1>
      
      {/* Photo Gallery */}
      <div className="photo-gallery">
        {data.photos?.map((photo, i) => (
          <img key={i} src={`http://localhost:5000${photo}`} alt={`Memory ${i+1}`} />
        ))}
      </div>

      {/* Message */}
      {data.message && (
        <div className="message-box">
          <p>{data.message}</p>
        </div>
      )}

      {/* Share Link */}
      <div className="share-section">
        <h3>🔗 Share This Page</h3>
        <div className="link-box">
          <input type="text" value={shareLink} readOnly />
          <button onClick={copyLink}>📋 Copy</button>
        </div>
      </div>

      {/* WhatsApp Status Video Download */}
      <VideoDownload pageId={id} />

      {/* Music Player */}
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

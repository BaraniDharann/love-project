import React, { useState } from 'react';
import axios from 'axios';
import './CreatePage.css';

const CreatePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    photos: [],
    song: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/create', formData);
      setResult(res.data);
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert('✅ Copied!');
  };

  if (result) {
    return (
      <div className="result-page">
        <h2>✅ Created Successfully!</h2>
        
        <div className="link-card">
          <h3>🔗 Share Link</h3>
          <input type="text" value={result.link} readOnly />
          <button onClick={() => copyLink(result.link)}>📋 Copy Link</button>
        </div>

        <div className="link-card video-card">
          <h3>📱 WhatsApp Status Video</h3>
          <p>⏳ Video is being generated... (Ready in ~30 seconds)</p>
          <input type="text" value={result.videoUrl} readOnly />
          <button onClick={() => copyLink(result.videoUrl)}>📋 Copy Video Link</button>
          <a href={result.videoUrl} download className="download-btn">
            ⬇️ Download Video
          </a>
        </div>

        <button onClick={() => setResult(null)} className="create-new">
          ➕ Create Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="create-form">
      <h2>💕 Create Love Page</h2>
      {/* Form fields here */}
      <button type="submit" disabled={loading}>
        {loading ? '⏳ Creating...' : '✨ Create & Get Links'}
      </button>
    </form>
  );
};

export default CreatePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import Footer from './Footer';
import './OnesideLove.css';

function OnesideLove() {
  const [step, setStep] = useState(1);
  const [loveType, setLoveType] = useState('');
  const [formData, setFormData] = useState({
    partnerName: '',
    feelings: '',
    selectedSong: '',
    bio: '',
    quote: ''
  });
  const [uploadedPhoto, setUploadedPhoto] = useState('');
  const [songs, setSongs] = useState([]);
  const [link, setLink] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewAudio, setPreviewAudio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (step === 2 && loveType) {
      const endpoint = loveType === 'single' ? 'http://localhost:5000/api/single-songs' : 'http://localhost:5000/api/songs';
      console.log('Fetching songs from:', endpoint, 'for loveType:', loveType);
      axios.get(endpoint)
        .then(res => {
          console.log('Songs received:', res.data);
          setSongs(res.data);
        })
        .catch(err => {
          console.error('Error fetching songs:', err);
        });
    }
  }, [step, loveType]);

  useEffect(() => {
    if (formData.selectedSong && showPreview) {
      if (previewAudio) previewAudio.pause();
      const songPath = loveType === 'single' 
        ? `http://localhost:5000/single-songs/${formData.selectedSong}`
        : `http://localhost:5000/songs/${formData.selectedSong}`;
      const audio = new Audio(songPath);
      audio.volume = 0.3;
      audio.loop = true;
      setTimeout(() => {
        audio.play().catch(err => console.log('Preview play:', err));
      }, 1500);
      setPreviewAudio(audio);
    }
    return () => {
      if (previewAudio) previewAudio.pause();
    };
  }, [showPreview, formData.selectedSong, loveType]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataObj = new FormData();
    formDataObj.append('photos', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formDataObj);
      setUploadedPhoto(res.data.files[0]);
    } catch (err) {
      alert('Error uploading photo');
    }
  };

  const handlePreview = () => {
    if (loveType === 'oneside' && (!formData.partnerName || !formData.feelings || !formData.selectedSong)) {
      alert('Please fill all required fields');
      return;
    }
    if (loveType === 'single' && (!uploadedPhoto || !formData.selectedSong)) {
      alert('Please upload photo and select a song');
      return;
    }
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.currentTime = 0;
    }
    setShowPreview(true);
  };

  const handleCreate = async () => {
    const data = {
      type: 'oneside-love',
      email: localStorage.getItem('userEmail'),
      loveType,
      ...formData,
      photo: uploadedPhoto,
      songFolder: loveType === 'single' ? 'single-songs' : 'songs'
    };

    try {
      const res = await axios.post('http://localhost:5000/api/create', data);
      setLink(res.data.link);
      setStep(3);
    } catch (err) {
      alert('Error creating page');
    }
  };

  if (step === 3) {
    return (
      <div className="oneside-container">
        <FloatingHearts count={30} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card success-card"
        >
          <h2>🎉 Your Page is Ready! 🎉</h2>
          <p>Share this link:</p>
          <div className="link-box">
            <input type="text" value={link} readOnly />
            <button onClick={() => navigator.clipboard.writeText(link)} className="btn btn-primary">
              Copy Link
            </button>
          </div>
          <button onClick={() => window.open(`/view/${link.split('/').pop()}`, '_blank')} className="btn btn-primary">
            Preview
          </button>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Create Another
          </button>
        </motion.div>
        <Footer />
      </div>
    );
  }

  if (showPreview) {
    return (
      <div className="oneside-container preview-mode">
        <FloatingHearts count={35} />
        <div className="preview-content">
          {loveType === 'oneside' ? (
            <>
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="preview-title"
              >
                💔 My Feelings for {formData.partnerName} 💔
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="feelings-box"
              >
                <h3>What I Want to Say...</h3>
                <p>{formData.feelings}</p>
              </motion.div>

              {uploadedPhoto && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="photo-display"
                >
                  <img src={`http://localhost:5000${uploadedPhoto}`} alt="Memory" />
                </motion.div>
              )}
            </>
          ) : (
            <>
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="preview-title single-title"
              >
                ✨ Forever Single & Fabulous ✨
              </motion.h1>

              {uploadedPhoto && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="photo-display stylish"
                >
                  <img src={`http://localhost:5000${uploadedPhoto}`} alt="Me" />
                </motion.div>
              )}

              {formData.bio && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="bio-box"
                >
                  <p>{formData.bio}</p>
                </motion.div>
              )}

              {formData.quote && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="quote-box"
                >
                  <p>"{formData.quote}"</p>
                </motion.div>
              )}
            </>
          )}

          <div className="preview-actions">
            <button onClick={() => {
              if (previewAudio) {
                previewAudio.pause();
                previewAudio.currentTime = 0;
              }
              setShowPreview(false);
            }} className="btn btn-primary">
              Edit
            </button>
            <button onClick={handleCreate} className="btn btn-accept">
              Confirm & Create Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="oneside-container">
        <FloatingHearts count={25} />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="card type-selection"
        >
          <h2>💔 Choose Your Story 💔</h2>
          <div className="type-options">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`type-card ${loveType === 'oneside' ? 'selected' : ''}`}
              onClick={() => setLoveType('oneside')}
            >
              <h3>💔 One-Side Love</h3>
              <p>Express your feelings to someone special</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`type-card ${loveType === 'single' ? 'selected' : ''}`}
              onClick={() => setLoveType('single')}
            >
              <h3>✨ Forever Single</h3>
              <p>Celebrate your independence and style</p>
            </motion.div>
          </div>

          <button
            onClick={() => setStep(2)}
            className="btn btn-primary"
            disabled={!loveType}
          >
            Continue
          </button>
        </motion.div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="oneside-container">
      <FloatingHearts count={25} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="card oneside-form"
      >
        <h2>{loveType === 'oneside' ? '💔 Express Your Feelings' : '✨ Show Your Style'}</h2>

        {loveType === 'oneside' ? (
          <>
            <div className="input-group">
              <label>Partner's Name *</label>
              <input
                type="text"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleInputChange}
                placeholder="Their name..."
                required
              />
            </div>

            <div className="input-group">
              <label>Your Feelings *</label>
              <textarea
                name="feelings"
                value={formData.feelings}
                onChange={handleInputChange}
                placeholder="Express what's in your heart..."
                rows="6"
                required
              />
            </div>

            <div className="input-group">
              <label>Upload a Photo (Optional)</label>
              <input
                type="file"
                accept="image/*,image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml"
                onChange={handlePhotoUpload}
                className="file-input"
              />
            </div>
          </>
        ) : (
          <>
            <div className="input-group">
              <label>Upload Your Photo *</label>
              <input
                type="file"
                accept="image/*,image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml"
                onChange={handlePhotoUpload}
                className="file-input"
                required
              />
            </div>

            <div className="input-group">
              <label>Your Bio (Optional)</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                rows="4"
              />
            </div>

            <div className="input-group">
              <label>Your Quote (Optional)</label>
              <input
                type="text"
                name="quote"
                value={formData.quote}
                onChange={handleInputChange}
                placeholder="A quote that defines you..."
              />
            </div>
          </>
        )}

        <div className="input-group">
          <label>Select a Song *</label>
          <select name="selectedSong" value={formData.selectedSong} onChange={handleInputChange} required>
            <option value="">Choose a song...</option>
            {songs.map((song, i) => (
              <option key={i} value={song.filename}>{song.name}</option>
            ))}
          </select>
        </div>

        {uploadedPhoto && (
          <div className="photo-preview">
            <img src={`http://localhost:5000${uploadedPhoto}`} alt="Preview" />
          </div>
        )}

        <button onClick={handlePreview} className="btn btn-primary">
          Preview
        </button>
      </motion.div>
      <Footer />
    </div>
  );
}

export default OnesideLove;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import Footer from './Footer';
import config from '../config';
import './Anniversary.css';

function Anniversary() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    anniversaryType: '',
    userName: '',
    partnerName: '',
    meetingPlace: '',
    proposedBy: '',
    loveStory: '',
    selectedSong: ''
  });
  const [photos, setPhotos] = useState([]);
  const [songs, setSongs] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [link, setLink] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewAudio, setPreviewAudio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${config.API_URL}/api/songs`)
      .then(res => setSongs(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (formData.selectedSong && showPreview) {
      if (previewAudio) previewAudio.pause();
      const audio = new Audio(`${config.API_URL}/songs/${formData.selectedSong}`);
      audio.volume = 0.3;
      audio.play().then(() => {
        setTimeout(() => {
          audio.pause();
        }, 60000);
      }).catch(err => console.log('Preview play:', err));
      setPreviewAudio(audio);
    }
    return () => {
      if (previewAudio) previewAudio.pause();
    };
  }, [showPreview, formData.selectedSong]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files).slice(0, 9);
    setPhotos(files);

    const formDataObj = new FormData();
    files.forEach(file => formDataObj.append('photos', file));

    try {
      const res = await axios.post(`${config.API_URL}/api/upload`, formDataObj);
      setUploadedPhotos(res.data.files);
    } catch (err) {
      alert('Error uploading photos');
    }
  };

  const handlePreview = () => {
    if (!formData.userName || !formData.partnerName || !formData.selectedSong) {
      alert('Please fill required fields');
      return;
    }
    if (uploadedPhotos.length !== 9) {
      alert('Please upload exactly 9 photos');
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
      type: 'anniversary',
      email: localStorage.getItem('userEmail'),
      ...formData,
      photos: uploadedPhotos
    };

    try {
      const res = await axios.post(`${config.API_URL}/api/create`, data);
      setLink(res.data.link);
      setStep(3);
    } catch (err) {
      alert('Error creating anniversary page');
    }
  };

  if (step === 3) {
    return (
      <div className="anniversary-container">
        <FloatingHearts count={30} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card success-card"
        >
          <h2>🎉 Your Anniversary Page is Ready! 🎉</h2>
          <p>Share this magical link with your partner:</p>
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
      <div className="anniversary-container preview-mode">
        <FloatingHearts count={40} />
        <div className="preview-content">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="preview-title"
          >
            {formData.userName} 💕 {formData.partnerName}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="preview-type"
          >
            {formData.anniversaryType === 'relationship' && '💑 Relationship Anniversary'}
            {formData.anniversaryType === 'lovers' && '💕 Lovers Anniversary'}
            {formData.anniversaryType === 'marriage' && '💍 Marriage Anniversary'}
          </motion.div>

          {formData.meetingPlace && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="meeting-place"
            >
              📍 First Met: {formData.meetingPlace}
            </motion.p>
          )}

          {formData.proposedBy && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="proposed-by"
            >
              💐 Proposed by: {formData.proposedBy}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="love-story-box"
          >
            <h3>Our Love Story</h3>
            <p>{formData.loveStory}</p>
          </motion.div>

          {uploadedPhotos.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="photo-gallery-preview"
            >
              <h3>Our Memories</h3>
              <div className="photos-grid-container">
                {uploadedPhotos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 + index * 0.15 }}
                    className="photo-item-grid"
                  >
                    <img src={`${config.API_URL}${photo}`} alt={`Memory ${index + 1}`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
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

  return (
    <div className="anniversary-container">
      <FloatingHearts count={25} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="card anniversary-form"
      >
        <h2>💑 Create Your Anniversary Page 💑</h2>

        <div className="input-group">
          <label>Anniversary Type *</label>
          <select name="anniversaryType" value={formData.anniversaryType} onChange={handleInputChange} required>
            <option value="">Select type...</option>
            <option value="relationship">Relationship Anniversary</option>
            <option value="lovers">Lovers Anniversary</option>
            <option value="marriage">Marriage Anniversary</option>
          </select>
        </div>

        <div className="input-group">
          <label>Your Name *</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="input-group">
          <label>Partner's Name *</label>
          <input
            type="text"
            name="partnerName"
            value={formData.partnerName}
            onChange={handleInputChange}
            placeholder="Enter partner's name"
            required
          />
        </div>

        <div className="input-group">
          <label>First Sight/Meeting Place (Optional)</label>
          <input
            type="text"
            name="meetingPlace"
            value={formData.meetingPlace}
            onChange={handleInputChange}
            placeholder="Where did you first meet?"
          />
        </div>

        <div className="input-group">
          <label>Who Proposed First? (Optional)</label>
          <input
            type="text"
            name="proposedBy"
            value={formData.proposedBy}
            onChange={handleInputChange}
            placeholder="Who made the first move?"
          />
        </div>

        <div className="input-group">
          <label>Your Love Story *</label>
          <textarea
            name="loveStory"
            value={formData.loveStory}
            onChange={handleInputChange}
            placeholder="Tell your beautiful love story..."
            rows="6"
            required
          />
        </div>

        <div className="input-group">
          <label>Select a Romantic Song *</label>
          <select name="selectedSong" value={formData.selectedSong} onChange={handleInputChange} required>
            <option value="">Choose a song...</option>
            {songs.map((song, i) => (
              <option key={i} value={song.filename}>{song.name}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Upload Photos (Mandatory - Exactly 9 Photos) *</label>
          <input
            type="file"
            accept="image/*,image/jpeg,image/jpg,image/png,image/gif,image/webp,image/bmp,image/svg+xml"
            multiple
            onChange={handlePhotoUpload}
            className="file-input"
            required
          />
          {photos.length > 0 && (
            <p className="file-count">{photos.length}/9 photo(s) selected</p>
          )}
          {uploadedPhotos.length === 9 && (
            <p className="file-success">✅ All 9 photos uploaded successfully!</p>
          )}
        </div>

        {uploadedPhotos.length > 0 && (
          <div className="photo-preview">
            {uploadedPhotos.map((photo, i) => (
              <img key={i} src={`${config.API_URL}${photo}`} alt={`Preview ${i}`} />
            ))}
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

export default Anniversary;

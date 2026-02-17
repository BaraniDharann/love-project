import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import Footer from './Footer';
import config from '../config';
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
      axios.get(`${config.API_URL}/api/songs`)
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
  }, [showPreview, formData.selectedSong, previewAudio]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataObj = new FormData();
    formDataObj.append('photos', file);

    try {
      const res = await axios.post(`${config.API_URL}/api/upload`, formDataObj);
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
      songFolder: 'songs'
    };

    try {
      const res = await axios.post(`${config.API_URL}/api/create`, data);
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
    const titleWords = loveType === 'oneside' 
      ? `A Message for ${formData.partnerName}`.split(' ')
      : 'Forever Single & Fabulous'.split(' ');
    
    const feelingsText = formData.feelings || '';
    const feelingsChars = feelingsText.split('');

    return (
      <div className="oneside-container preview-mode">
        <FloatingHearts count={35} />
        <div className="animated-background">
          <div className="love-word" style={{top: '10%', left: '5%', animationDelay: '0s'}}>Desire</div>
          <div className="love-word" style={{top: '20%', left: '8%', animationDelay: '0.5s'}}>Devotion</div>
          <div className="love-word" style={{top: '40%', left: '3%', animationDelay: '1s'}}>Precious</div>
          <div className="love-word" style={{top: '60%', left: '6%', animationDelay: '1.5s'}}>Beautiful</div>
          <div className="love-word" style={{top: '80%', left: '10%', animationDelay: '2s'}}>Love</div>
          <div className="love-word" style={{top: '15%', right: '5%', animationDelay: '0.3s'}}>Affection</div>
          <div className="love-word" style={{top: '25%', right: '8%', animationDelay: '0.8s'}}>Passion</div>
          <div className="love-word" style={{top: '45%', right: '3%', animationDelay: '1.3s'}}>Cherish</div>
          <div className="love-word" style={{top: '65%', right: '6%', animationDelay: '1.8s'}}>Beloved</div>
          <div className="love-word" style={{top: '85%', right: '10%', animationDelay: '2.3s'}}>Forever</div>
          <div className="love-word" style={{top: '30%', left: '12%', animationDelay: '0.6s'}}>Adore</div>
          <div className="love-word" style={{top: '50%', left: '10%', animationDelay: '1.1s'}}>Darling</div>
          <div className="love-word" style={{top: '35%', right: '12%', animationDelay: '0.9s'}}>Treasure</div>
          <div className="love-word" style={{top: '55%', right: '15%', animationDelay: '1.4s'}}>Sweetheart</div>
          <div className="love-word" style={{top: '70%', left: '15%', animationDelay: '1.6s'}}>Soulmate</div>
          <div className="love-word" style={{top: '75%', right: '18%', animationDelay: '1.9s'}}>Angel</div>
        </div>
        <div className="preview-content">
          {loveType === 'oneside' ? (
            <>
              <motion.div className="title-container">
                <motion.div className="heart-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, type: "spring" }}
                >
                  💔
                </motion.div>
                <h1 className="preview-title">
                  {titleWords.map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 50, rotateX: 90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: i * 0.15, duration: 0.6, type: "spring" }}
                      className="word-reveal"
                    >
                      {word}{' '}
                    </motion.span>
                  ))}
                </h1>
                <motion.div className="heart-icon"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, type: "spring", delay: 0.3 }}
                >
                  💔
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="feelings-box"
              >
                <motion.h3
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                >
                  💌 What I Want to Say... 💌
                </motion.h3>
                <p className="feelings-text">
                  {feelingsChars.map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 + (i * 0.02), duration: 0.1 }}
                      className="char-fade"
                    >
                      {char}
                    </motion.span>
                  ))}
                </p>
              </motion.div>

              {uploadedPhoto && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 1 }}
                  className="photo-display romantic"
                >
                  <motion.div 
                    className="heart-shape"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 3, duration: 1.5, type: "spring" }}
                  >
                    <motion.div 
                      className="puzzle-container"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ delay: 5.5, duration: 0.5 }}
                    >
                      {[...Array(25)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="puzzle-piece"
                          initial={{ 
                            opacity: 0,
                            x: (i % 5 < 2 ? -1 : 1) * (300 + Math.random() * 200),
                            y: (Math.floor(i / 5) < 2 ? -1 : 1) * (300 + Math.random() * 200),
                            scale: 0.3
                          }}
                          animate={{ 
                            opacity: 1,
                            x: 0,
                            y: 0,
                            scale: 1
                          }}
                          transition={{ 
                            delay: 3.5 + (i * 0.08),
                            duration: 1.5,
                            type: "spring",
                            stiffness: 80
                          }}
                          style={{
                            backgroundImage: `url(${config.API_URL}${uploadedPhoto})`,
                            backgroundPosition: `${(i % 5) * 25}% ${(Math.floor(i / 5) * 25) + 20}%`,
                            backgroundSize: '500% 500%'
                          }}
                        />
                      ))}
                    </motion.div>
                    <motion.div 
                      className="heart-reveal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 5.5, duration: 1.5 }}
                      style={{ backgroundImage: `url(${config.API_URL}${uploadedPhoto})` }}
                    />
                  </motion.div>
                  
                  <div className="heart-icons-container">
                    {[...Array(20)].map((_, i) => {
                      const angle = (i / 20) * 360;
                      const distance = 400;
                      const x = Math.cos(angle * Math.PI / 180) * distance;
                      const y = Math.sin(angle * Math.PI / 180) * distance;
                      
                      return (
                        <motion.div
                          key={i}
                          className="floating-heart-icon"
                          initial={{ 
                            opacity: 0,
                            x: x,
                            y: y,
                            scale: 0
                          }}
                          animate={{ 
                            opacity: 1,
                            x: x * 0.35,
                            y: y * 0.35,
                            scale: 1
                          }}
                          transition={{ 
                            delay: 5.5 + (i * 0.1),
                            duration: 2,
                            type: "spring"
                          }}
                        >
                          💕
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  <motion.div 
                    className="photo-glow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 6, duration: 1 }}
                  />
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
                  <img src={`${config.API_URL}${uploadedPhoto}`} alt="Me" />
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

          <motion.div 
            className="preview-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 0.8 }}
          >
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
          </motion.div>
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
            <img src={`${config.API_URL}${uploadedPhoto}`} alt="Preview" />
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

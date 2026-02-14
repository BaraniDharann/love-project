import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import './ViewPage.css';

function ViewPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [rejectAttempts, setRejectAttempts] = useState(0);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/view/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (data && audioRef.current) {
      const playAudio = () => {
        audioRef.current.play().catch(err => {
          console.log('Auto-play blocked, trying user interaction:', err);
          document.addEventListener('click', () => {
            audioRef.current.play().catch(e => console.log('Play failed:', e));
          }, { once: true });
        });
      };
      setTimeout(playAudio, 2500);
    }
  }, [data]);

  useEffect(() => {
    if (accepted && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => {
        console.log('Auto-play blocked:', err);
        document.addEventListener('click', () => {
          audioRef.current.play().catch(e => console.log('Play failed:', e));
        }, { once: true });
      });
    }
  }, [accepted]);

  const handleRejectHover = (e) => {
    if (rejectAttempts < 10) {
      const maxX = window.innerWidth - 200;
      const maxY = window.innerHeight - 200;
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      e.target.style.position = 'fixed';
      e.target.style.left = `${x}px`;
      e.target.style.top = `${y}px`;
      setRejectAttempts(prev => prev + 1);
    }
  };

  const handleAccept = () => {
    setAccepted(true);
  };

  const handleDownloadVideo = async () => {
    setVideoLoading(true);
    setVideoError(null);
    try {
      alert('⏳ Generating 30-second video... Please wait!');
      const res = await axios.get(`http://localhost:5000/api/generate-video/${id}`);
      if (res.data.success) {
        window.open(res.data.videoUrl, '_blank');
        
        const link = document.createElement('a');
        link.href = res.data.videoUrl;
        link.download = `love-video-${id}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('✅ Video generated successfully! Check your downloads folder.');
      }
    } catch (error) {
      setVideoError(error.response?.data?.error || 'Video generation failed');
      alert('❌ Error: ' + (error.response?.data?.error || 'Failed to generate video. Please try again.'));
    }
    setVideoLoading(false);
  };

  if (loading) {
    return (
      <div className="view-container loading">
        <FloatingHearts count={20} />
        <h2>Loading your love story... 💕</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="view-container error">
        <h2>❌ Page not found</h2>
        <p>This love story doesn't exist or has been removed.</p>
      </div>
    );
  }

  if (data.type === 'love-proposal') {
    if (!accepted) {
      return (
        <div className="view-container proposal-view">
          <FloatingHearts count={25} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="view-content proposal-card"
          >
            <h1 className="view-title">💖 Will You Be Mine? 💖</h1>
            <p className="proposal-text">
              I've been thinking about this for a while now, and I can't imagine my life without you.
              You make every day brighter and fill my heart with joy. Will you accept my love?
            </p>
            <div className="buttons-container">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="btn btn-accept"
                onClick={handleAccept}
              >
                💕 Yes, I Accept! 💕
              </motion.button>
              <button
                className="btn btn-reject"
                onMouseEnter={handleRejectHover}
                onClick={() => {
                  if (rejectAttempts >= 10) {
                    handleAccept();
                  }
                }}
              >
                {rejectAttempts >= 10 ? '💕 Accept 💕' : '❌ No'}
              </button>
            </div>
            {rejectAttempts > 0 && rejectAttempts < 10 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hint-text"
              >
                😊 Try again! {10 - rejectAttempts} attempts left...
              </motion.p>
            )}
          </motion.div>
        </div>
      );
    }

    return (
      <div className="view-container proposal-view">
        <FloatingHearts count={40} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="view-content"
        >
          <h1 className="view-title">💖 A Special Message For You 💖</h1>
          <div className="message-box">
            <p>{data.message}</p>
          </div>
          {data.photos && data.photos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="photos-section"
            >
              <div className="photos-grid">
                {data.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.15 }}
                    className="photo-frame"
                  >
                    <img src={`http://localhost:5000${photo}`} alt={`Memory ${index + 1}`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          <div className="download-section">
            <button onClick={handleDownloadVideo} disabled={videoLoading} className="download-btn">
              {videoLoading ? '⏳ Generating Video...' : '📥 Download Video'}
            </button>
            {videoError && <p className="error-text">{videoError}</p>}
          </div>
          {data.song && (
            <audio ref={audioRef} src={`http://localhost:5000/songs/${data.song}`} loop preload="auto" style={{display: 'none'}} />
          )}
        </motion.div>
      </div>
    );
  }

  if (data.type === 'anniversary') {
    return (
      <div className="view-container anniversary-view">
        <FloatingHearts count={50} />
        <div className="view-content">
          <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="view-title">
            {data.userName} 💕 {data.partnerName}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="anniversary-type">
            {data.anniversaryType === 'relationship' && '💑 Relationship Anniversary'}
            {data.anniversaryType === 'lovers' && '💕 Lovers Anniversary'}
            {data.anniversaryType === 'marriage' && '💍 Marriage Anniversary'}
          </motion.div>
          {data.meetingPlace && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="detail-text">
              📍 First Met: {data.meetingPlace}
            </motion.p>
          )}
          {data.proposedBy && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="detail-text">
              💐 Proposed by: {data.proposedBy}
            </motion.p>
          )}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="story-box">
            <h3>Our Love Story</h3>
            <p>{data.loveStory}</p>
          </motion.div>
          {data.photos && data.photos.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="photos-section">
              <h3>Our Beautiful Memories</h3>
              <div className="photos-grid">
                {data.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + index * 0.15 }}
                    className={`photo-frame ${index === Math.floor(data.photos.length / 2) ? 'heart-frame' : ''}`}
                  >
                    <img src={`http://localhost:5000${photo}`} alt={`Memory ${index + 1}`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          <div className="download-section">
            <button onClick={handleDownloadVideo} disabled={videoLoading} className="download-btn">
              {videoLoading ? '⏳ Generating Video...' : '📥 Download Video'}
            </button>
            {videoError && <p className="error-text">{videoError}</p>}
          </div>
          {data.selectedSong && (
            <audio ref={audioRef} src={`http://localhost:5000/songs/${data.selectedSong}`} loop preload="auto" style={{display: 'none'}} />
          )}
        </div>
      </div>
    );
  }

  if (data.type === 'oneside-love') {
    return (
      <div className="view-container oneside-view">
        <FloatingHearts count={35} />
        <div className="view-content">
          {data.loveType === 'oneside' ? (
            <>
              <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="view-title">
                💔 A Message for {data.partnerName} 💔
              </motion.h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="feelings-display">
                <h3>What I Want to Say...</h3>
                <p>{data.feelings}</p>
              </motion.div>
              {data.photo && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} className="photo-frame">
                  <img src={`http://localhost:5000${data.photo}`} alt="Memory" />
                </motion.div>
              )}
            </>
          ) : (
            <>
              <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="view-title single-view-title">
                ✨ Forever Single & Fabulous ✨
              </motion.h1>
              {data.photo && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="stylish-frame-container">
                  <img src={`http://localhost:5000${data.photo}`} alt="Profile" className="stylish-frame-img" />
                </motion.div>
              )}
              {data.bio && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="bio-display elite-bio">
                  <p>{data.bio}</p>
                </motion.div>
              )}
              {data.quote && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="quote-display elite-quote">
                  <p>"{data.quote}"</p>
                </motion.div>
              )}
            </>
          )}
          <div className="download-section">
            <button onClick={handleDownloadVideo} disabled={videoLoading} className="download-btn">
              {videoLoading ? '⏳ Generating Video...' : '📥 Download Video'}
            </button>
            {videoError && <p className="error-text">{videoError}</p>}
          </div>
          {data.selectedSong && (
            <audio ref={audioRef} src={`http://localhost:5000/songs/${data.selectedSong}`} loop preload="auto" style={{display: 'none'}} />
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default ViewPage;

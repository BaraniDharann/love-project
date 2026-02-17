import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import Footer from './Footer';
import config from '../config';
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
    axios.get(`${config.API_URL}/api/view/${id}`)
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
        audioRef.current.currentTime = 0;
        audioRef.current.play().then(() => {
          setTimeout(() => {
            audioRef.current.pause();
          }, 60000);
        }).catch(err => {
          console.log('Auto-play blocked, trying user interaction:', err);
          document.addEventListener('click', () => {
            audioRef.current.play().then(() => {
              setTimeout(() => {
                audioRef.current.pause();
              }, 60000);
            }).catch(e => console.log('Play failed:', e));
          }, { once: true });
        });
      };
      playAudio();
    }
  }, [data]);

  useEffect(() => {
    if (accepted && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setTimeout(() => {
          audioRef.current.pause();
        }, 60000);
      }).catch(err => {
        console.log('Auto-play blocked:', err);
        document.addEventListener('click', () => {
          audioRef.current.play().then(() => {
            setTimeout(() => {
              audioRef.current.pause();
            }, 60000);
          }).catch(e => console.log('Play failed:', e));
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
      alert('🎬 Recording your love story with all animations... Please wait 30 seconds!');
      const res = await axios.get(`${config.API_URL}/api/generate-video/${id}`);
      if (res.data.success) {
        window.open(res.data.videoUrl, '_blank');
        
        const link = document.createElement('a');
        link.href = res.data.videoUrl;
        link.download = `love-video-${id}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        alert('✅ Video recorded successfully with all animations! Check your downloads.');
      }
    } catch (error) {
      setVideoError(error.response?.data?.error || 'Video recording failed');
      alert('❌ Error: ' + (error.response?.data?.error || 'Failed to record video. Please try again.'));
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
          <Footer />
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
                    <img src={`${config.API_URL}${photo}`} alt={`Memory ${index + 1}`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {data.song && (
            <audio ref={audioRef} src={`${config.API_URL}/songs/${data.song}`} loop preload="auto" style={{display: 'none'}} />
          )}
        </motion.div>
        <Footer />
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
                    <img src={`${config.API_URL}${photo}`} alt={`Memory ${index + 1}`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          <div className="download-section">
            <button onClick={handleDownloadVideo} disabled={videoLoading} className="download-btn">
              {videoLoading ? '🎬 Recording...' : '🎬 Record & Download Video'}
            </button>
            {videoError && <p className="error-text">{videoError}</p>}
          </div>
          {data.selectedSong && (
            <audio ref={audioRef} src={`${config.API_URL}/songs/${data.selectedSong}`} loop preload="auto" style={{display: 'none'}} />
          )}
        </div>
        <Footer />
      </div>
    );
  }

  if (data.type === 'oneside-love') {
    const titleWords = data.loveType === 'oneside' 
      ? `A Message for ${data.partnerName}`.split(' ')
      : 'Forever Single & Fabulous'.split(' ');
    
    const feelingsText = data.feelings || '';
    const feelingsChars = feelingsText.split('');

    return (
      <div className="view-container oneside-view">
        <FloatingHearts count={35} />
        <div className="animated-background">
          <div className="love-word" style={{top: '15%', left: '10%', animationDelay: '0s'}}>Desire</div>
          <div className="love-word" style={{top: '25%', left: '15%', animationDelay: '0.5s'}}>Devotion</div>
          <div className="love-word" style={{top: '45%', left: '8%', animationDelay: '1s'}}>Precious</div>
          <div className="love-word" style={{top: '65%', left: '12%', animationDelay: '1.5s'}}>Beautiful</div>
          <div className="love-word" style={{top: '85%', left: '18%', animationDelay: '2s'}}>Love</div>
          <div className="love-word" style={{top: '20%', right: '10%', animationDelay: '0.3s'}}>Affection</div>
          <div className="love-word" style={{top: '30%', right: '15%', animationDelay: '0.8s'}}>Passion</div>
          <div className="love-word" style={{top: '50%', right: '8%', animationDelay: '1.3s'}}>Cherish</div>
          <div className="love-word" style={{top: '70%', right: '12%', animationDelay: '1.8s'}}>Beloved</div>
          <div className="love-word" style={{top: '88%', right: '18%', animationDelay: '2.3s'}}>Forever</div>
          <div className="love-word" style={{top: '35%', left: '20%', animationDelay: '0.6s'}}>Adore</div>
          <div className="love-word" style={{top: '55%', left: '18%', animationDelay: '1.1s'}}>Darling</div>
          <div className="love-word" style={{top: '40%', right: '20%', animationDelay: '0.9s'}}>Treasure</div>
          <div className="love-word" style={{top: '60%', right: '22%', animationDelay: '1.4s'}}>Sweetheart</div>
          <div className="love-word" style={{top: '75%', left: '25%', animationDelay: '1.6s'}}>Soulmate</div>
          <div className="love-word" style={{top: '78%', right: '25%', animationDelay: '1.9s'}}>Angel</div>
        </div>
        <div className="view-content">
          {data.loveType === 'oneside' ? (
            <>
              <motion.div className="title-container">
                <motion.div className="heart-icon"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, type: "spring" }}
                >
                  💔
                </motion.div>
                <h1 className="view-title">
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
                className="feelings-display romantic-feelings"
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

              {data.photo && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 2.5, duration: 1 }} 
                  className="romantic-photo"
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
                            backgroundImage: `url(${config.API_URL}${data.photo})`,
                            backgroundPosition: `${(i % 5) * 25}% ${Math.floor(i / 5) * 25}%`,
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
                      style={{ backgroundImage: `url(${config.API_URL}${data.photo})` }}
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
              <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="view-title single-view-title">
                ✨ Forever Single & Fabulous ✨
              </motion.h1>
              {data.photo && (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="stylish-frame-container">
                  <img src={`${config.API_URL}${data.photo}`} alt="Profile" className="stylish-frame-img" />
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
          {data.selectedSong && (
            <audio ref={audioRef} src={`http://localhost:5000/songs/${data.selectedSong}`} loop preload="auto" style={{display: 'none'}} />
          )}
        </div>
        <Footer />
      </div>
    );
  }

  return null;
}

export default ViewPage;

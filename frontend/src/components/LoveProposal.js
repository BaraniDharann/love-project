import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import Footer from './Footer';
import config from '../config';
import './LoveProposal.css';

function LoveProposal() {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [selectedSong, setSelectedSong] = useState('');
  const [songs, setSongs] = useState([]);
  const [link, setLink] = useState('');
  const [previewAudio, setPreviewAudio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${config.API_URL}/api/songs`)
      .then(res => setSongs(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedSong && step === 1) {
      const audio = new Audio(`${config.API_URL}/songs/${selectedSong}`);
      audio.volume = 0.3;
      audio.play().then(() => {
        setTimeout(() => {
          audio.pause();
        }, 60000);
      }).catch(err => console.log('Preview play:', err));
      setPreviewAudio(audio);
      return () => {
        audio.pause();
      };
    }
  }, [selectedSong, step]);

  const handleCreateProposal = async () => {
    if (!message || !selectedSong) {
      alert('Please fill all fields');
      return;
    }

    const data = {
      type: 'love-proposal',
      email: localStorage.getItem('userEmail'),
      message,
      song: selectedSong,
      photos: []
    };

    try {
      const res = await axios.post(`${config.API_URL}/api/create`, data);
      setLink(res.data.link);
      setStep(2);
    } catch (err) {
      alert('Error creating proposal');
    }
  };

  if (step === 2) {
    return (
      <div className="proposal-container">
        <FloatingHearts count={30} />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card success-card"
        >
          <h2>🎉 Your Love Proposal is Ready! 🎉</h2>
          <p>Share this link with your partner:</p>
          <div className="link-box">
            <input type="text" value={link} readOnly />
            <button onClick={() => navigator.clipboard.writeText(link)} className="btn btn-primary">
              Copy Link
            </button>
          </div>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Create Another
          </button>
        </motion.div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="proposal-container">
      <FloatingHearts count={30} />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="card proposal-form"
      >
        <h2>💕 Express Your Love 💕</h2>
        
        <div className="input-group">
          <label>Your Message to Your Partner</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your heartfelt message..."
            rows="6"
          />
        </div>

        <div className="input-group">
          <label>Select a Romantic Song</label>
          <select value={selectedSong} onChange={(e) => setSelectedSong(e.target.value)}>
            <option value="">Choose a song...</option>
            {songs.map((song, i) => (
              <option key={i} value={song.filename}>{song.name}</option>
            ))}
          </select>
        </div>

        <button onClick={handleCreateProposal} className="btn btn-primary">
          Create Proposal
        </button>
      </motion.div>
      <Footer />
    </div>
  );
}

export default LoveProposal;

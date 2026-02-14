import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import Footer from './Footer';
import './Home.css';

function Home() {
  const [email, setEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !selectedCategory) {
      alert('Please enter email and select a category');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email');
      return;
    }
    localStorage.setItem('userEmail', email);
    navigate(selectedCategory);
  };

  const categories = [
    {
      id: 'love-proposal',
      title: '💕 Love Proposal',
      description: 'Express your feelings and propose to your partner',
      gradient: 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%)'
    },
    {
      id: 'anniversary',
      title: '💑 Anniversary',
      description: 'Celebrate your special moments together',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'oneside-love',
      title: '💔 One-Side Love',
      description: 'Express your feelings or celebrate being single',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  return (
    <div className="home-container">
      <FloatingHearts count={20} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="home-content"
      >
        <h1 className="home-title">💖 Love For Person 💖</h1>
        <p className="home-subtitle">Create beautiful memories and express your love</p>

        <div className="email-section">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
            required
          />
        </div>

        <div className="categories-grid">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`category-card ${selectedCategory === cat.id ? 'selected' : ''}`}
              style={{ background: cat.gradient }}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary continue-btn"
          onClick={handleSubmit}
          disabled={!email || !selectedCategory}
        >
          Continue →
        </motion.button>
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default Home;

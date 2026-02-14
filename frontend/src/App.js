import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoveProposal from './components/LoveProposal';
import Anniversary from './components/Anniversary';
import OnesideLove from './components/OnesideLove';
import ViewPage from './components/ViewPage';
import './App.css';

function App() {
  return (
    <Router>
      <img src="/cupid.png" alt="cupid" className="cupid-left" />
      <div className="cupid-arrow"></div>
      <img src="/cupid.png" alt="cupid" className="cupid-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/love-proposal" element={<LoveProposal />} />
        <Route path="/anniversary" element={<Anniversary />} />
        <Route path="/oneside-love" element={<OnesideLove />} />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import Quiz from './components/Quiz';
import Leaderboard from './pages/Leaderboard';
import './index.css';
import Logo1 from '../src/assets/quiz.svg';
import Logo2 from '../src/assets/buzz.svg';
import { motion } from 'framer-motion';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='flex justify-center mt-7 hover:cursor-pointer' onClick={() => window.location.href = './'}>
      <img src={Logo1} alt="Logo" />
      <motion.img src={Logo2} alt="Logo" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
      </div>
      <Router>
        <Routes>
          <Route path='/' element={<Quiz/>} />
          <Route path='/leaderboard' element={<Leaderboard />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
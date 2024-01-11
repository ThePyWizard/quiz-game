import React from 'react';
import Quiz from './components/Quiz';
import Leaderboard from './pages/Leaderboard';
import './index.css';
import Logo from '../src/assets/logo.svg';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='flex justify-center mt-8' onClick={() => window.location.href = './'}>
      <img src={Logo} alt="Logo" />
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
import React from 'react';
import Quiz from './components/Quiz';
import Leaderboard from './pages/Leaderboard';
import './index.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div onClick={() => window.location.href = './'}>
      <h1 className='text-6xl flex justify-center font-custom font-bold mt-20 hover:cursor-pointer'>QUIZ <span className="text-white bg-green-500 ml-1 hover:cursor-pointer"> BUZZ</span></h1>
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
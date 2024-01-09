import React from 'react';
import Quiz from './components/Quiz';
import Leaderboard from './pages/Leaderboard';
import './index.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1 className='text-6xl flex justify-center font-custom font-bold mt-20'>QUIZ <span className="text-white bg-green-500 ml-1"> BUZZ</span></h1>
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
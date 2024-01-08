import React from 'react';
import Quiz from './components/Quiz';
import './index.css';


function App() {
  return (
    <div className="App">
      <h1 className='text-6xl flex justify-center font-custom font-bold mt-20'>QUIZ BUZZ</h1>
      <Quiz />
    </div>
  );
}

export default App;
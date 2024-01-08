import React, { useState } from 'react';

const QuizSetup = ({ startQuiz }) => {
  const [userName, setUserName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('any'); // Default theme

  const handleStartQuiz = (e) => {
    e.preventDefault();
    startQuiz(userName, selectedTheme);
  };

  return (
    <div>
      <h2 className='font-custom'>Welcome to the Quiz!</h2>
      <form onSubmit={handleStartQuiz}>
        <label className='font-custom'>
          Enter your name:
          <input className='border-width-2 border-red m-4'
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label className='font-custom'>
          Choose a theme:
          <select value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
            <option value="any">Any Theme</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            {/* Add more theme options */}
          </select>
        </label>
        <br />
        <button type="submit" className='font-custom'>Start Quiz</button>
      </form>
    </div>
  );
};

export default QuizSetup;
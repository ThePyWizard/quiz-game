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
      <form onSubmit={handleStartQuiz}>
        <label className='text-2xl font-custom flex justify-center mt-8'>
          Enter your name:
          <input
            type="text" 
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-4'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label className='font-custom text-2xl flex justify-center mt-8'>
          Choose a theme:
          <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-4' value={selectedTheme} onChange={(e) => setSelectedTheme(e.target.value)}>
            <option value="any">Any Theme</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            {/* Add more theme options */}
          </select>
        </label>
        <br />
        <div className="flex justify-center mt-8">
          <button type="button" className='font-custom text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Start Quiz</button>
        </div>
      </form>
    </div>
  );
};

export default QuizSetup;
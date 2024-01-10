import React, { useState } from 'react';

const QuizSetup = ({ startQuiz }) => {
  const [userName, setUserName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('any'); // Default theme

  const categories = [
    { id: 9, name: 'General Knowledge' },
    { id: 10, name: 'Entertainment: Books' },
    { id: 11, name: 'Entertainment: Film' },
    { id: 12, name: 'Entertainment: Music' },
    { id: 13, name: 'Entertainment: Musicals & Theatres' },
    { id: 14, name: 'Entertainment: Television' },
    { id: 15, name: 'Entertainment: Video Games' },
    { id: 16, name: 'Entertainment: Board Games' },
    { id: 17, name: 'Science & Nature' },
    { id: 18, name: 'Science: Computers' },
    { id: 19, name: 'Science: Mathematics' },
    { id: 20, name: 'Mythology' },
    { id: 21, name: 'Sports' },
    { id: 22, name: 'Geography' },
    { id: 23, name: 'History' },
    { id: 24, name: 'Politics' },
    { id: 25, name: 'Art' },
    { id: 26, name: 'Celebrities' },
    { id: 27, name: 'Animals' },
    { id: 28, name: 'Vehicles' },
    { id: 29, name: 'Entertainment: Comics' },
    { id: 30, name: 'Science: Gadgets' },
    { id: 31, name: 'Entertainment: Japanese Anime & Manga' },
    { id: 32, name: 'Entertainment: Cartoon & Animations' },
  ];

  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (selectedTheme === 'any') {
      const randomIndex = Math.floor(Math.random() * categories.length);
      const randomTheme = categories[randomIndex].id;
      startQuiz(userName, randomTheme);
    } else {
      startQuiz(userName, selectedTheme);
    };
  };
  return (
    <div>
      <form onSubmit={handleStartQuiz}>
        <label className='text-2xl font-custom flex justify-center mt-8'>
          Enter your name:
          <input
            type="text"
            className='bg-gray-50 border border-gray-300 w-48 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-4'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label className='font-custom text-2xl flex justify-center mt-8'>
          Choose a theme:
          <select
            className='bg-gray-50 border border-gray-300 w-48 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-4'
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            <option value="any">Any Theme</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.id} - {category.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className='font-custom text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
          >
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizSetup;

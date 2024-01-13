import React, { useState, useEffect } from 'react';
import Quizsetup from './Quizsetup';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import he from 'he';


const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('any');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timer, setTimer] = useState(0); // Changed initial timer value to 0
  const [quizEnded, setQuizEnded] = useState(false); // Added state for quiz ended
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
  const startQuiz = (name, theme) => {
    setUserName(name || 'Unknown'); // Set name to 'unknown' if not entered
    setSelectedTheme(theme);
    fetchQuestions(theme);
    setQuizEnded(false); // Reset quiz ended state
    setTimer(60); // Start the timer
  };

  useEffect(() => {
    if (questions.length > 0 && currentQuestion >= questions.length) {
      // Quiz ends, do something (e.g., display final score)
      alert(`Quiz ended! Your score is: ${score}/${questions.length}`);
      // Quiz ends, add score to leaderboard
      const addScoreToLeaderboard = async () => {
        try {
          // Get a reference to the 'leaderboard-stats' collection
          const selectedThemename = categories.find((category) => category.id === parseInt(selectedTheme, 10));
          console.log("Selected Theme Name:", selectedThemename.name); // Access the 'name' property
          const leaderboardRef = collection(db, 'leaderboard-stats');

          // Add a new document with user's name and score
          await addDoc(leaderboardRef, {
            Name: userName,
            Score: score,
            Theme: selectedThemename.name,
            //timestamp: new Date() // Optionally, add a timestamp for when the score was added
          });

          console.log('Score added to leaderboard!');
        } catch (error) {
          console.error('Error adding score to leaderboard: ', error);
        }
      };

      addScoreToLeaderboard();
      setQuizEnded(true); // Set quiz ended state to true
    }
  }, [currentQuestion, questions, score, userName]);

  useEffect(() => {
    let countdown;
    if (timer > 0 && currentQuestion < questions.length) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && currentQuestion < questions.length) {
      clearInterval(countdown);
      alert('Time is up!');
      setCurrentQuestion(currentQuestion + 1);
      setTimer(60);
    }
  
    return () => clearInterval(countdown);
  }, [timer, currentQuestion, questions.length]);
  

  const fetchQuestions = async (theme) => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${theme}&type=multiple`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        // Shuffle options for each question
        const shuffledQuestions = data.results.map((question) => {
          return {
            ...question,
            incorrect_answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
          };
        });
        setQuestions(shuffledQuestions);
      } else {
        console.error('No questions fetched');
      }
    } catch (error) {
      console.error('Error fetching questions: ', error);
    }
  };

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleContinueClick = () => {
    if (selectedAnswer === questions[currentQuestion]?.correct_answer) {
      setScore(score + 1);
    }
    setSelectedAnswer('');
    setCurrentQuestion(currentQuestion + 1);
    setTimer(60);
  };

  const handleRestartClick = () => {
    setUserName('');
    setSelectedTheme('');
    setQuestions([]);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer('');
    setTimer(0); // Reset timer to 0
    setQuizEnded(false);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div>
      {userName === '' ? (
        <Quizsetup startQuiz={startQuiz} />
      ) : (
        questions.length > 0 && currentQuestion < questions.length ? (
          <div>
            <h2 className='font-custom text-2xl mt-8 flex justify-center sm: ml-3'>
              Question {currentQuestion + 1}/{questions.length}
            </h2>
            <h2 className='font-custom text-2xl mt-8 flex justify-center'>
              {he.decode(questions[currentQuestion]?.question)}
            </h2>
            <ul>
            {questions[currentQuestion]?.incorrect_answers.map((answer, index) => (
              <li
                className={`font-custom text-2xl mt-8 flex justify-center hover:cursor-pointer ${
                  selectedAnswer === answer ? 'bg-green-300' : ''
                }`}
                key={index}
                onClick={() => handleAnswerClick(answer)}
              >
                {he.decode(answer)}
              </li>
            ))}

            </ul>
            <div className='flex justify-center'>
            <button
              className='font-custom bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8'
              onClick={handleContinueClick}
            >
              Continue
            </button>
            </div>
            
            <p className='font-custom flex justify-center mt-8'>Time remaining: {timer} seconds</p>
          </div>
        ) : (
          quizEnded ? (
            <div className='font-custom'>
              <p className='flex justify-center mt-8'>Quiz ended! Your score is: {score}/{questions.length}</p>
              <div className='flex justify-center'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8'
                onClick={handleRestartClick}
              >
                Restart Quiz
              </button>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 ml-4'
                onClick={() => window.location.href = './leaderboard'}
              >
                Go to Leaderboard
              </button>
              </div>
            </div>
          ) : (
            <p className='font-custom flex justify-center mt-8 text-xl'>Loading questions...</p>
          )
        )
      )}
    </div>
  );
};

export default Quiz;

import React, { useState, useEffect } from 'react';
import QuizSetup from './Quizsetup';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';


const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timer, setTimer] = useState(0); // Changed initial timer value to 0
  const [quizEnded, setQuizEnded] = useState(false); // Added state for quiz ended

  const startQuiz = (name, theme) => {
    setUserName(name || 'Unknown'); // Set name to 'unknown' if not entered
    setSelectedTheme(theme);
    fetchQuestions();
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
          const leaderboardRef = collection(db, 'leaderboard-stats');

          // Add a new document with user's name and score
          await addDoc(leaderboardRef, {
            Name: userName,
            Score: score,
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
  

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&type=multiple&category=${selectedTheme}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setQuestions(data.results);
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

  return (
    <div>
      {userName === '' ? (
        <QuizSetup startQuiz={startQuiz} />
      ) : (
        questions.length > 0 && currentQuestion < questions.length ? (
          <div>
            <h2 className='font-custom text-2xl mt-8 flex justify-center'>
              Question {currentQuestion + 1}/{questions.length}
            </h2>
            <h2 className='font-custom text-2xl mt-8 flex justify-center'>
              {questions[currentQuestion]?.question}
            </h2>
            <ul>
              {questions[currentQuestion]?.incorrect_answers.map((answer, index) => (
                <li
                  className={`font-custom text-2xl mt-8 flex justify-center ${
                    selectedAnswer === answer ? 'bg-blue-200' : ''
                  }`}
                  key={index}
                  onClick={() => handleAnswerClick(answer)}
                >
                  {answer}
                </li>
              ))}
              <li
                className={`font-custom text-2xl mt-8 flex justify-center ${
                  selectedAnswer === questions[currentQuestion]?.correct_answer ? 'bg-blue-200' : ''
                }`}
                onClick={() => handleAnswerClick(questions[currentQuestion]?.correct_answer)}
              >
                {questions[currentQuestion]?.correct_answer}
              </li>
            </ul>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8'
              onClick={handleContinueClick}
            >
              Continue
            </button>
            <p>Time remaining: {timer} seconds</p>
          </div>
        ) : (
          quizEnded ? (
            <div>
              <p>Quiz ended! Your score is: {score}/{questions.length}</p>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8'
                onClick={handleRestartClick}
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <p>Loading questions...</p>
          )
        )
      )}
    </div>
  );
};

export default Quiz;

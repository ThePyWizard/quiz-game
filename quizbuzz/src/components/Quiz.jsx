import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=5&type=multiple'
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
    if (answer === questions[currentQuestion]?.correct_answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (questions && nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      // Quiz ends, do something (e.g., display final score)
      alert(`Quiz ended! Your score is: ${score}/${questions.length}`);
    }
  };

  return (
    <div>
      {questions && questions.length > 0 ? (
        <div>
          <h2>{questions[currentQuestion]?.question}</h2>
          <ul>
            {questions[currentQuestion]?.incorrect_answers.map((answer, index) => (
              <li key={index} onClick={() => handleAnswerClick(answer)}>
                {answer}
              </li>
            ))}
            <li onClick={() => handleAnswerClick(questions[currentQuestion]?.correct_answer)}>
              {questions[currentQuestion]?.correct_answer}
            </li>
          </ul>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
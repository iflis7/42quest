import { useState } from 'react';
import Questions from './components/Questions';
import { fetchQuizQuestions } from './API';
import { Difficulty } from './API';
import './index.css';

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  const startTrivia = async () => {};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App flex-col  w-full mx-auto mt-5 max-w-sm p-4 bg-white border border-gray-200 
      rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h1>REACT QUIZ</h1>
        <button
          className='inline-flex items-center justify-center p-0.5 mb-2 mr-2 
      overflow-hidden text-sm font-medium text-gray-900 rounded-lg 
      group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400
       group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none
        focus:ring-green-200 dark:focus:ring-green-800'
          onClick={startTrivia}
        >
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
            Start{' '}
          </span>
        </button>
        <p className='score'>Score:</p>
        <p>Loading Quests...</p>
        {/* <Questions
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      /> */}

        <button
          className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 
      overflow-hidden text-sm font-medium text-gray-900 rounded-lg 
      group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400
       group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none
        focus:ring-green-200 dark:focus:ring-green-800'
          onClick={nextQuestion}
        >
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
            Next Quest{' '}
          </span>
        </button>

    </div>
  );
}

export default App;

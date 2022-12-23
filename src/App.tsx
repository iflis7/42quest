import { useState } from 'react';
import Questions from './components/Questions';
import { fetchQuizQuestions } from './API';
import { QuestionState, Difficulty } from './API';
import './index.css';

const TOTAL_QUESTIONS = 10;

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log('Res: ', questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY // TODO add error handling
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  };

  const nextQuestion = () => {

  };

  return (
    <div
      className='App flex-col  w-full mx-auto mt-5 max-w-sm p-4 bg-white border border-gray-200 
      rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'
    >
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button
          className='inline-flex items-center justify-center p-0.5 mb-2 mr-2 
      overflow-hidden text-sm font-medium text-gray-900 rounded-lg 
      group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400
       group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 
       focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'
          onClick={startTrivia}
        >
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
            Start{' '}
          </span>
        </button>
      ) : null}

      {!gameOver ? <p className='score'>Score:</p> : null}
      {loading ? <p>Loading Quests...</p> : null}
      {!loading && !gameOver ? (
        <Questions
          key={questions[number].question}
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}

      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
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
      ) : null}
    </div>
  );
}

export default App;

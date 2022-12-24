import { useState } from 'react';
import Questions from '../components/Questions';
import { AnswerObject, fetchQuizQuestions } from '../API';
import { QuestionState, Difficulty } from '../API';
import { FiRefreshCcw } from 'react-icons/fi';
import { IconContext } from 'react-icons';

const TOTAL_QUESTIONS = 10;

function Quiz() {
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
    if (!gameOver) {
      // Users answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  return (
    <div
      className='flex flex-col items-center mx-auto p-4 bg-white border border-gray-500 
      rounded-md w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
      shadow-md shadow-yellow-500 h-3/4 sm:p-6 md:p-8'
    >
      <h1
        className='m-2 text-3xl font-extrabold text-gray-900 dark:text-black 
      md:text-5xl lg:text-6xl'
      >
        <span
          className='text-transparent bg-clip-text bg-gradient-to-r
       to-emerald-600 from-sky-400'
        >
          42 Quest
        </span>{' '}
        Quiz{' '}
      </h1>
      {gameOver ? (
        <button
          className='flex self-center p-1  mb-2 mr-2 mt-40 px-6
      overflow-hidden text-sm font-medium text-gray-900 rounded-lg 
      group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400
       group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 
       focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'
          onClick={startTrivia}
        >
          <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white
           dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
            Start{' '}
          </span>
        </button>
      ) : null}
      {/* || userAnswers.length === TOTAL_QUESTIONS */}

      {!gameOver ? (
        <h4 className='flex text-2xl mt-4 py-2 font-bold text-black'>
          Score:{' '}
          <span
            className='px-2 text-transparent bg-clip-text bg-gradient-to-r
       to-emerald-600 from-sky-400'
          >
            {' '}
            {score}{' '}
          </span>
        </h4>
      ) : null}
      {loading ? (
        <div role='status'>
          <svg
            className='inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      ) : null}
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
          className='relative inline-flex items-center justify-center p-0 sm:mt-2 px-8
      overflow-hidden text-sm font-medium text-gray-900 rounded-lg 
      group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400
       group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none
        focus:ring-green-200 dark:focus:ring-green-800'
          onClick={nextQuestion}
        >
          <span className='relative px-2 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
            Next Quest{' '}
          </span>
        </button>
      ) : null}
      {userAnswers.length === TOTAL_QUESTIONS? (
        <button
          className='flex self-center p-1  mb-2 mr-2 px-8
      overflow-hidden text-sm font-medium text-gray-900 rounded-lg 
      group bg-gradient-to-br from-red-400 to-blue-600 group-hover:from-green-400
       group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 
       focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'
          onClick={startTrivia}
        >
          <span
            className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white
           dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'
          >
            <IconContext.Provider
              value={{ size: '25', className: 'global-class-name' }}
            >
              <FiRefreshCcw />
            </IconContext.Provider>
          </span>
        </button>
      ) : null}
    </div>
  );
}

export default Quiz;

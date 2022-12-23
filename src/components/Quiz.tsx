import { useState } from 'react';
import Questions from '../components/Questions';
import { AnswerObject, fetchQuizQuestions } from '../API';
import { QuestionState, Difficulty } from '../API';


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
      className="flex flex-col items-center mx-auto p-4 bg-white border border-gray-500 
      rounded-md w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 
      shadow-lg h-2/3 sm:p-6 md:p-8"
    >
      <h1 className="m-2 text-3xl font-extrabold text-gray-900 dark:text-black 
      md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r
       to-emerald-600 from-sky-400">42 Quest</span> Quiz </h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button
          className='flex p-0.5 mb-2 mr-2 mt-4 px-6
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

      {!gameOver ? <h4 className="flex text-2xl py-2 font-bold text-black">Score: {score}</h4> : null}
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

export default Quiz;

import React from 'react';
import { AnswerObject } from '../API';

type QuestionsProps = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
};

const Questions: React.FC<QuestionsProps> = (props: QuestionsProps) => {
  return (
    <div className='flex flex-col items-center mb-2'>
      <p className='text-lg font-medium p-2 my-1 '>
        Question: {props.questionNr} / {props.totalQuestions}
        {props.questionNr >= 2 ? (
          <span
            className='mx-2 bg-gray-100 text-emerald-600 text-sm font-semibold inline-flex 
        items-center p-1.5 rounded-full mr-2 dark:bg-emerald-500 dark:text-gray-300'
          >
            <svg
              aria-hidden='true'
              className='w-3.5 h-3.5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Icon description</span>
          </span>
        ) : null}
      </p>
      <p className="font-semibold pb-2 text-lg" dangerouslySetInnerHTML={{ __html: props.question }} />
      <div >
        {props.answers.map((answer) => (
          <div className="font-medium my-1.5 p-1 px-4 rounded-md
          text-white bg-black hover:bg-yellow-300 hover:text-black
          " key={answer}>
            <button
              disabled={props.userAnswer ? true : false}
              value={answer}
              onClick={props.callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;

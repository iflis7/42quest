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
    <div className='flex flex-col items-center'>
      <p className='number '>
        Question: {props.questionNr} / {props.totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: props.question }} />
      <div>
        {props.answers.map((answer) => (
          <div key={answer}>
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

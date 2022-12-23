import React from 'react';

type QuestionsProps = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestions: number;
};

const Questions: React.FC<QuestionsProps> = (props: QuestionsProps) => {
  return (
    <div>
      <p className='number'>
        Question: ({props.questionNr} / {props.totalQuestions})
      </p>
      <p dangerouslySetInnerHTML={{ __html: props.question }} />
      <div>
        {props.answers.map((answer) => (
          <div>
            <button disabled={props.userAnswer} onClick={props.callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;

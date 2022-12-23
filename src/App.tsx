import { useState } from 'react';
import Questions from './components/Questions';
import './index.css';

const TOTAL_QUESTIONS = 10;

function App() {
  return (
    <div className='App'>
      <h1>REACT QUIZ</h1>
      <Questions />
    </div>
  );
}

export default App;

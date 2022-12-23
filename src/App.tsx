import Quiz from './components/Quiz';
import './index.css';

function App() {
  return (
    <div
      className="App flex items-center pt-20 bg-[url('/public/bg.jpg')] bg-cover dark:bg-gray-800  
      h-screen w-full"
    >
      <Quiz />
    </div>
  );
}

export default App;

import { useState } from 'react';
import Button from './components/Button';
import Input from './components/Input';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  const handleButtonClick = () => {
    alert('Кнопка натиснута!');
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br />
        <br />
        <Button text='Натисни на мене' type='button' onClick={handleButtonClick} />
        <br />
        <br />
        <Input type='text' value={value} placeholder='Введіть текст...' onChange={(e) => setValue(e.target.value)} />
        <p>Введено в текстове поле: {value}</p>
      </div>
    </>
  )
}

export default App

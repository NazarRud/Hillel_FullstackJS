import { useState, Suspense } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { MessageComponent } from './components/MessageComponent';
import type { UserTodo, MessageResult } from "./types/todo";

  const fetchMessage = (): Promise<MessageResult> => {
    return new Promise<MessageResult>((resolve) => { 
      setTimeout(() => {
        const id = Math.floor(Math.random() * 200) + 1;

        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
          .then((res) => { 
            if (!res.ok) {
              throw new Error(`HTTP ${res.status}`);
            }

            return res.json() as Promise<UserTodo>;
          })
          .then((data) => resolve(data))
          .catch(() => resolve("Немає доступних повідомлень"));
      }, 1000);
    });
  };

  const messagePromise = fetchMessage();

function App() {
  const [count, setCount] = useState(0);

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
      </div>
      <hr />
      <div>
        <Suspense fallback={<div>Завантаження...</div>}>
          <MessageComponent promise={messagePromise} />
        </Suspense>
      </div>
    </>
  )
}

export default App;
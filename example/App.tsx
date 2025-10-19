import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Priority, PriorityProvider, useFreePriority } from '../src';
import viteLogo from '/vite.svg'
import './App.css'

const Icons = () => {
  const freePriority = useFreePriority();

  useEffect(() => {
    setTimeout(freePriority, 3000);
  }, []);

  return (
    <div>
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}

const Loading = () => (
  <div className="loader" style={{ marginTop: "3rem" }} />
);

function App() {
  const [count, setCount] = useState(0)

  return (
    <PriorityProvider>
        <Priority level={0}>
          <Icons />
        </Priority>
      <Priority level={1} fallback={<Loading />}>
        <h1>Demo</h1>
        
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </Priority>
    </PriorityProvider>
  )
}

export default App

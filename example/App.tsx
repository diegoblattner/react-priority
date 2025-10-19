import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { Priority, useFreePriority } from "../src";
import viteLogo from "/vite.svg";
import "./App.css";

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
    <Priority.Provider>
      <div className="card">
        <p>Priority 0</p>
        <Priority level={0}>
          <Icons />
        </Priority>
      </div>
      <div className="card">
        <p>Priority 1</p>
        <Priority level={1} fallback={<Loading />}>
          <h1>Demo</h1>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </Priority>
      </div>
    </Priority.Provider>
  );
}

export default App

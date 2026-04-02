import { useState } from "react";
import "./style.css";

function Ex3() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <main className="page">
      <section className="counter-card">
        <h1>Counter Application</h1>
        <p className="subtitle">Web Technologies - Exercise 3</p>

        <p className="counter-value">{count}</p>

        <div className="counter-actions">
          <button className="btn btn-decrement" onClick={decrement}>
            Decrement
          </button>
          <button className="btn btn-increment" onClick={increment}>
            Increment
          </button>
        </div>
      </section>
    </main>
  );
}

export default Ex3;


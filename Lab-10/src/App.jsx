import { useState } from "react";
import "./style.css";
import Ex1 from "./Ex1";
import Ex2 from "./Ex2";
import Ex3 from "./Ex3";

function App() {
  const [selectedExercise, setSelectedExercise] = useState(null);

  if (selectedExercise === "ex1") {
    return (
      <>
        <button className="back-btn" onClick={() => setSelectedExercise(null)}>
          Back to Menu
        </button>
        <Ex1 />
      </>
    );
  }

  if (selectedExercise === "ex2") {
    return (
      <>
        <button className="back-btn" onClick={() => setSelectedExercise(null)}>
          Back to Menu
        </button>
        <Ex2 />
      </>
    );
  }

  if (selectedExercise === "ex3") {
    return (
      <>
        <button className="back-btn" onClick={() => setSelectedExercise(null)}>
          Back to Menu
        </button>
        <Ex3 />
      </>
    );
  }

  return (
    <main className="page">
      <section className="menu-card">
        <div className="form-header">
          <p className="badge">Lab 10</p>
          <h1>Exercise Selector</h1>
          <p className="subtitle">Choose which exercise you want to open</p>
        </div>
        <div className="menu-actions">
          <button className="submit-btn" onClick={() => setSelectedExercise("ex1")}>
            Open Exercise 1
          </button>
          <button className="submit-btn" onClick={() => setSelectedExercise("ex2")}>
            Open Exercise 2
          </button>
          <button className="submit-btn" onClick={() => setSelectedExercise("ex3")}>
            Open Exercise 3
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;


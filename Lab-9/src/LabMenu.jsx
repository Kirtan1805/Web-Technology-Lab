import { useState } from "react";
import "./style.css";
import Ex1 from "./Ex1";
import Ex2 from "./Ex2";
import Ex3 from "./Ex3";

function LabMenu() {
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
        <h1>Lab 9 Exercises</h1>
        <p className="subtitle">Choose an exercise to open</p>

        <div className="menu-actions">
          <button className="menu-btn" onClick={() => setSelectedExercise("ex1")}>
            Open Exercise 1
          </button>
          <button className="menu-btn" onClick={() => setSelectedExercise("ex2")}>
            Open Exercise 2
          </button>
          <button className="menu-btn" onClick={() => setSelectedExercise("ex3")}>
            Open Exercise 3
          </button>
        </div>
      </section>
    </main>
  );
}

export default LabMenu;


import "./style.css";
import StudentCard from "./StudentCard";

function Ex2() {
  const students = [
    { id: 1, name: "Priya", department: "CSE", marks: 92 },
    { id: 2, name: "Arun", department: "IT", marks: 87 },
    { id: 3, name: "Meena", department: "ECE", marks: 90 },
    { id: 4, name: "Rahul", department: "EEE", marks: 84 },
  ];

  return (
    <main className="page">
      <section className="cards-wrapper">
        <h1>Student Cards</h1>
        <p className="subtitle">Web Technologies - Exercise 2</p>

        <div className="cards-grid">
          {students.map((student) => (
            <StudentCard
              key={student.id}
              name={student.name}
              department={student.department}
              marks={student.marks}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Ex2;


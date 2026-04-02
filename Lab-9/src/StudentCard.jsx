function StudentCard({ name, department, marks }) {
  return (
    <article className="student-card">
      <h2>{name}</h2>
      <p>
        <span className="card-label">Department</span>
        <span className="card-value">{department}</span>
      </p>
      <p>
        <span className="card-label">Marks</span>
        <span className="card-value">{marks}</span>
      </p>
    </article>
  );
}

export default StudentCard;


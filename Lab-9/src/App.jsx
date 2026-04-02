import "./style.css";

function StudentProfile() {
  const name = "Priya Sharma";
  const department = "Computer Science and Engineering";
  const year = "III Year";
  const section = "B";

  return (
    <div className="profile-card">
      <h1>Student Profile</h1>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Department:</strong> {department}
      </p>
      <p>
        <strong>Year:</strong> {year}
      </p>
      <p>
        <strong>Section:</strong> {section}
      </p>
    </div>
  );
}

export default StudentProfile;


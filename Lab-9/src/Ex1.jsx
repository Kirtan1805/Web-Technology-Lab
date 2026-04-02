import "./style.css";

function Ex1() {
  const name = "Priya Sharma";
  const department = "Computer Science and Engineering";
  const year = "III Year";
  const section = "B";

  return (
    <main className="page">
      <section className="profile-card">
        <h1>Student Profile</h1>
        <p className="subtitle">Web Technologies - Exercise 1</p>

        <div className="profile-row">
          <span className="label">Name</span>
          <span className="value">{name}</span>
        </div>
        <div className="profile-row">
          <span className="label">Department</span>
          <span className="value">{department}</span>
        </div>
        <div className="profile-row">
          <span className="label">Year</span>
          <span className="value">{year}</span>
        </div>
        <div className="profile-row">
          <span className="label">Section</span>
          <span className="value">{section}</span>
        </div>
      </section>
    </main>
  );
}

export default Ex1;


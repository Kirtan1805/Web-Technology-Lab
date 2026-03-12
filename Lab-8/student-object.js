// ES6 program using object destructuring and spread operator

const student = {
  id: 101,
  name: "Priya",
  department: "CSE",
  marks: 92,
};

// Object destructuring to extract properties
const { id, name, department, marks } = student;
console.log(id, name, department, marks);

// Create a new object using the spread operator and add grade
const updatedStudent = {
  ...student,
  grade: "A",
};

console.log(updatedStudent);


// ES6 class and Promise example for course enrollment

class Course {
  constructor(courseName, instructor) {
    this.courseName = courseName;
    this.instructor = instructor;
  }

  displayCourse() {
    console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
  }
}

// Create a course instance
let course1 = new Course("Web Technologies", "Dr. Kumar");
course1.displayCourse();

// Promise to simulate enrollment based on seat availability
let enrollCourse = new Promise((resolve, reject) => {
  let seatsAvailable = true; // change to false to test "Course Full"

  if (seatsAvailable) {
    resolve("Enrollment Successful");
  } else {
    reject("Course Full");
  }
});

enrollCourse
  .then((msg) => console.log(msg))
  .catch((err) => console.log(err));


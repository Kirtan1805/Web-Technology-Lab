const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

// Listener 1 for the same event
eventEmitter.on("studentRegistered", (studentName, department) => {
  console.log(`[Listener 1] Student Registered: ${studentName} (${department})`);
});

// Listener 2 for the same event
eventEmitter.on("studentRegistered", (studentName) => {
  console.log(`[Listener 2] Sending welcome email to ${studentName}...`);
});

// Another custom event
eventEmitter.on("courseAssigned", (studentName, courseName) => {
  console.log(`[Course Event] ${studentName} assigned to ${courseName}`);
});

// Demonstrate asynchronous event triggers
setTimeout(() => {
  eventEmitter.emit("studentRegistered", "Arun", "CSE");
}, 500);

setTimeout(() => {
  eventEmitter.emit("courseAssigned", "Arun", "Web Technologies");
}, 1000);

setTimeout(() => {
  eventEmitter.emit("studentRegistered", "Priya", "IT");
}, 1500);


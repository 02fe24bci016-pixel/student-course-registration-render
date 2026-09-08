const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const courses = [
  { id: 1, code: "CS101", name: "Introduction to Programming", credits: 4, seats: 30 },
  { id: 2, code: "CS202", name: "Data Structures", credits: 4, seats: 25 },
  { id: 3, code: "CS303", name: "Database Management Systems", credits: 3, seats: 20 },
  { id: 4, code: "CS404", name: "Computer Networks", credits: 3, seats: 15 }
];

const registrations = [];

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

app.get("/api/registrations", (req, res) => {
  res.json(registrations);
});

app.post("/api/register", (req, res) => {
  const { studentName, studentId, courseId } = req.body;

  if (!studentName || !studentId || !courseId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const course = courses.find(c => c.id === Number(courseId));
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  if (course.seats <= 0) {
    return res.status(400).json({ message: "No seats available for this course." });
  }

  const alreadyRegistered = registrations.some(
    r => r.studentId === studentId && r.courseId === course.id
  );

  if (alreadyRegistered) {
    return res.status(400).json({ message: "Student is already registered for this course." });
  }

  const registration = {
    id: registrations.length + 1,
    studentName,
    studentId,
    courseId: course.id,
    courseCode: course.code,
    courseName: course.name,
    registeredAt: new Date().toISOString()
  };

  registrations.push(registration);
  course.seats--;

  res.status(201).json({
    message: "Course registration successful!",
    registration
  });
});

app.delete("/api/registrations/:id", (req, res) => {
  const index = registrations.findIndex(r => r.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Registration not found." });
  }

  const removed = registrations.splice(index, 1)[0];
  const course = courses.find(c => c.id === removed.courseId);
  if (course) course.seats++;

  res.json({ message: "Registration cancelled successfully." });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Student Course Registration System running on port ${PORT}`);
});
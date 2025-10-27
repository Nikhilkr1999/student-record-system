import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Temporary in-memory student list
let students = [];

// Add student
app.post("/api/students", (req, res) => {
  const { name, course, marks } = req.body;
  const newStudent = { id: Date.now(), name, course, marks };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Get students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// Update student
app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ message: "Student not found" });
  students[index] = { ...students[index], ...req.body };
  res.json(students[index]);
});

// Delete student
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  students = students.filter((s) => s.id !== id);
  res.json({ message: "Deleted successfully" });
});

app.get("/", (req, res) => {
  res.send("✅ Student Record API is running");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

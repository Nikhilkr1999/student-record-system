const express = require("express");
const router = express.Router();

// 🧠 Our in-memory student list
let students = [
  { id: 1, name: "Nikhil", course: "MCA", marks: 95 },
  { id: 2, name: "Krishna", course: "BCA", marks: 88 },
];

// ➕ CREATE
router.post("/", (req, res) => {
  const { name, course, marks } = req.body;
  if (!name || !course || !marks) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    course,
    marks: Number(marks),
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 📖 READ (all)
router.get("/", (req, res) => {
  res.json(students);
});

// ✏️ UPDATE
// ✏️ UPDATE (edit any or all fields)
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, course, marks } = req.body;

  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  // 🧩 Update only the fields that are provided
  if (name !== undefined && name !== "") student.name = name;
  if (course !== undefined && course !== "") student.course = course;
  if (marks !== undefined && marks !== "") student.marks = Number(marks);

  res.json({ message: "✅ Student updated successfully", student });
});


// ❌ DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deleted = students.splice(index, 1);
  res.json({ message: "Deleted successfully", deleted });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Student = require('../Models/AddStudent');

// POST a new student
router.post('/login', (req, res) => {
  const { Studentid, password } = req.body;
  Student.findOne({ Studentid: Studentid })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success login");
        } else {
          res.json("Password is incorrect");
        }
      } else {
        res.json("No Student Found");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json("Server Error");
    });
});

router.post('/', async (req, res) => {
  try {
    const { fee, feepaid, Studentid } = req.body;
    const existingStudent = await Student.findOne({ Studentid });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student ID is already in use.' });
    }

    // Validate fee and fee paid fields
    if (isNaN(fee) || isNaN(feepaid)) {
      return res.status(400).json({ message: 'Fee and Fee Paid must be numbers.' });
    }

    const student = new Student({
      ...req.body,
      fee: fee || 0,
      feepaid: feepaid || 0
    });
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST multiple students
router.post('/multiple', async (req, res) => {
  try {
    const studentsData = req.body; 

    // Validate if the request body is an array
    if (!Array.isArray(studentsData)) {
      return res.status(400).json({ message: 'Request body must be an array of students.' });
    }

    // Validate each student object
    const invalidStudents = studentsData.filter(student => {
      return !student.Studentid || isNaN(student.fee) || isNaN(student.feepaid);
    });

    if (invalidStudents.length > 0) {
      return res.status(400).json({ message: 'Invalid student data.' });
    }

    // Create an array to store successfully saved students
    const savedStudents = [];

    for (const studentData of studentsData) {
      const existingStudent = await Student.findOne({ Studentid: studentData.Studentid });
      if (existingStudent) {
        continue; 
      }

      const student = new Student({
        ...studentData,
        fee: studentData.fee || 0,
        feepaid: studentData.feepaid || 0
      });
      await student.save();
      savedStudents.push(student);
    }

    res.status(200).json(savedStudents);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a specific student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a student by Studentid
router.get('/student/:studentid', async (req, res) => {
  try {
    const studentId = req.params.studentid;
    const student = await Student.findOne({ Studentid: studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a student by ID
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Teacher = require('../Models/AddTeacher');


router.post('/login', (req, res) => {
  const { TeacherId, password } = req.body;
  Teacher.findOne({ TeacherId: TeacherId })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success login");
        } else {
          res.json("Password is incorrect");
        }
      } else {
        res.json("No Teacher Found");
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    });
});


// POST a new teacher
router.post('/', async (req, res) => {
  try {
    const { TeacherId } = req.body;

    // Check if a teacher with the same TeacherId already exists
    const existingTeacher = await Teacher.findOne({ TeacherId });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher ID is already in use.' });
    }

    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a specific teacher by ID
router.get('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a teacher by Teacherid
router.post('/teacher/:teacherid', async (req, res) => {
  try {
    const teacherId = String(req.body.teacherid); // Cast to string using concatenation
    const teacher = await Teacher.find({ Teacherid: teacherId });
    if (!teacher || teacher.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/teacher/:TeacherId', async (req, res) => {
  try {
    const TeacherId = req.params.TeacherId;
    const teacher = await Teacher.findOne({ TeacherId });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    console.error('Error fetching teacher:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Update a teacher by ID
router.put('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a teacher by ID
router.delete('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

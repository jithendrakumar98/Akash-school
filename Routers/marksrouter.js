const express = require('express');
const router = express.Router();
const StudentMarks = require('../Models/Addmarks');

router.post('/', async (req, res) => {
  try {
    const studentData = req.body;
    for (const student of studentData) {
      const { Examname, Studentid } = student;

      const existingMarks = await StudentMarks.findOne({ Examname, Studentid });
      if (existingMarks) {
        return res.status(400).json({ message: 'Marks for this exam and student already exist' });
      }

      const {
        Studentname,
        class: studentClass,
        Telugu,
        Hindi,
        English,
        Maths,
        Science,
        Social
      } = student;

      const studentMarks = new StudentMarks({
        Studentid,
        Studentname,
        Examname,
        class: studentClass,
        Telugu,
        Hindi,
        English,
        Maths,
        Science,
        Social
      });

      await studentMarks.save();
    }

    res.status(200).json({ message: 'Students marks added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const studentMarks = await StudentMarks.find();
    res.json(studentMarks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/:examName/:studentId/:selectedSubject', async (req, res) => {
  try {
    const { examName, studentId, selectedSubject } = req.params;
    const updatedMarks = req.body[selectedSubject];

    const studentMarks = await StudentMarks.findOneAndUpdate(
      { Studentid: studentId, Examname: examName },
      { [selectedSubject]: updatedMarks },
      { new: true }
    );

    if (!studentMarks) {
      return res.status(404).json({ message: 'Student marks not found' });
    }

    res.json({ message: 'Student marks updated successfully', studentMarks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/studentId/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentMarks = await StudentMarks.find({ Studentid: studentId });

    if (studentMarks.length === 0) {
      return res.status(404).json({ message: 'No marks found for the given student ID' });
    }

    res.json(studentMarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/:examName', async (req, res) => {
  try {
    const studentMarks = await StudentMarks.findOne({ Studentid: req.params.id, Examname: req.params.examName });
    if (!studentMarks) {
      return res.status(404).json({ message: 'Student marks not found' });
    }
    res.json(studentMarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/:examName', async (req, res) => {
  try {
    const studentMarks = await StudentMarks.findOneAndUpdate(
      { Studentid: req.params.id, Examname: req.params.examName },
      req.body,
      { new: true }
    );
    if (!studentMarks) {
      return res.status(404).json({ message: 'Student marks not found' });
    }
    res.json(studentMarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    await StudentMarks.deleteMany({});
    res.json({ message: 'All records deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:examName', async (req, res) => {
  try {
    const examName = req.params.examName;
    if (!examName) {
      return res.status(400).json({ message: 'Exam name is required' });
    }
    await StudentMarks.deleteMany({ Examname: examName });
    res.json({ message: `All records for the exam "${examName}" deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id/:examName', async (req, res) => {
  try {
    const { id, examName } = req.params;
    await StudentMarks.deleteOne({ Studentid: id, Examname: examName });
    res.json({ message: 'Student marks deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/multiple', async (req, res) => {
  try {
    const { records } = req.body;

    if (!Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const deletedRecords = [];

    for (const record of records) {
      const { id, examName } = record;

      const deletedRecord = await StudentMarks.findOneAndDelete({ Studentid: id, Examname: examName });

      if (deletedRecord) {
        deletedRecords.push(deletedRecord);
      }
    }

    if (deletedRecords.length === 0) {
      return res.status(404).json({ message: 'No records found' });
    }

    res.json({ message: 'Records deleted successfully', deletedRecords });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
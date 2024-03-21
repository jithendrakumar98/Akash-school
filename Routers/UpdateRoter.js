const express = require('express');
const router = express.Router();
const Update = require('../Models/Update');

// POST a new update
router.post('/', async (req, res) => {
  try {
    const update = new Update(req.body);
    await update.save();
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all updates
router.get('/', async (req, res) => {
  try {
    const updates = await Update.find();
    res.json(updates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a specific update by ID
router.get('/:id', async (req, res) => {
  try {
    const update = await Update.findById(req.params.id);
    if (!update) {
      return res.status(404).json({ message: 'Update not found' });
    }
    res.json(update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an update by ID
router.put('/:id', async (req, res) => {
  try {
    const update = await Update.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!update) {
      return res.status(404).json({ message: 'Update not found' });
    }
    res.json(update);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an update by ID
router.delete('/update/:id', async (req, res) => {
  try {
    const update = await Update.findByIdAndDelete(req.params.id);
    if (!update) {
      return res.status(404).json({ message: 'Update not found' });
    }
    res.json({ message: 'Update deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete updates by StudentId
router.delete('/:studentId', async (req, res) => {
  try {
    const updates = await Update.deleteMany({ StudentId: req.params.studentId });
    if (updates.deletedCount === 0) {
      return res.status(404).json({ message: 'No updates found for the student' });
    }
    res.json({ message: 'Updates deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

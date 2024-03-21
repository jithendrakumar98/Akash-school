const express = require('express');
const router = express.Router();
const Admin = require('../Models/AdminRegister');

router.post('/login', (req, res) => {
  const { Username, password } = req.body;
  Admin.findOne({ Username: Username })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success login");
        } else {
          res.json("Password is incorrect");
        }
      } else {
        res.json("No Admin Found");
      }
    })
    .catch(error => {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    });
});

router.post('/', async (req, res) => {
  try {
    const { Username, Adminname, mobileNumber, mail, address, password } = req.body;
    const admin = new Admin({
      Username,
      Adminname,
      mobileNumber,
      mail,
      address,
      password
    });
    await admin.save();
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a specific admin by ID
router.get('/:id', async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an admin by ID
router.put('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an admin by ID
router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  Username: String,
  Adminname: String,
  mobileNumber: Number,
  mail: String,
  address: String,
  password: String,
});

module.exports = mongoose.model('Admin', AdminSchema);

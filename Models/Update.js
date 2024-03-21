const mongoose = require('mongoose');

const UpdateSchema = new mongoose.Schema({
  StudentId: String,
  UpdateRequest: String,
  Disc: String,
});

module.exports = mongoose.model('Update', UpdateSchema);

const mongoose = require('mongoose');

const MarksSchema = new mongoose.Schema({
    Studentid: String,
    Studentname: String,
    Examname: String,
    class: String,
    Telugu: Number,
    Hindi: Number,
    English: Number,
    Maths: Number,
    Science: Number,
    Social: Number,

});

module.exports = mongoose.model('AddMarks',MarksSchema);

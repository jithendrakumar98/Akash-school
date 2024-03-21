const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
        TeacherId:String,
        Teachername: String,
        subject: String,
        mobileNumber: Number,
        address: String,
        password: String,
});

module.exports = mongoose.model('Teacher',TeacherSchema);

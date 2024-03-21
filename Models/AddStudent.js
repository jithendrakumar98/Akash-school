const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    Studentid: String,
    Studentname: String,
    parentNames: String,
    mobileNumber:Number,
    class: String,
    address: String,
    password: String,
    fee: Number,
    feepaid:Number,

});

module.exports = mongoose.model('Student',StudentSchema);

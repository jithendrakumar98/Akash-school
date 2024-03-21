const mongoose = require('mongoose');

const BusesSchema = new mongoose.Schema({
        Busnumber:String,
        Drivername: String,
        DriverLicense: String,
        mobileNumber: Number,
        Route: String,
        Villages: String,
});

module.exports = mongoose.model('Buses',BusesSchema);

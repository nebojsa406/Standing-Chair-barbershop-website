const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    fullname: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: false},
    service: {type: String, required: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    details: {type: String, required: false}
});

module.exports = mongoose.model("Appointment", appointmentSchema);
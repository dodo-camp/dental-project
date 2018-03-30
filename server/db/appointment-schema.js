var mongoose = require('mongoose');

var AppointmentSchema = new mongoose.Schema({
    email: String,
    fullname: String,
    phone: String,
    specialnote: String,
    day: [],
    date: { year: String, month: String, day: String },
    time: { hour: String, minute: String, second: String },
    preferedTime: [],
    department: String,
    isAuthenticated: { type: Boolean, required: true },
    authToken: { type: String, required: true, unique: true },
    notify: { type: Boolean, required: true }
});

module.exports = mongoose.model('Appointments', AppointmentSchema);
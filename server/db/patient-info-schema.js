const mongoose = require("../db/create");
var Schema = mongoose.Schema;
var userSchema = new Schema(
    {
        email: String,
        firstname: String,
        lastname: String,
        mobile_number: String,
        gender: String,
        citizen: String,
        dob: { year: String, month: String, day: String },
        street_address: String,
        street_address2: String,
        landmark: String,
        city: String,
        state: String,
        code: String,
        image: String
    });
try {
    var Info = mongoose.model("PatientInformation", userSchema);
}
catch (e) {
    console.log(e);
}
module.exports = Info;
const mongoose = require("../db/create");
var Schema = mongoose.Schema;
var userSchema = new Schema({ email: String, password: String });
try {
    var User = mongoose.model("PatientRegister", userSchema);
}
catch (e) {
    console.log(e);
}
module.exports = User;
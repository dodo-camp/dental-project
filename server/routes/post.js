const express = require("express");
const router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");
var multer = require('multer');
var config = require('../db/database');
const User = require('../db/schema');
const Chat = require('../db/chat-schema');

var DIR = '../dist/assets/images';
var upload = multer({ dest: DIR }).single('photo');

var config = require('../db/database');
var information = require('../model/patient-info-model');
var InfoSchema = require('../db/patient-info-crud');
var infochangeschema = require('../db/patient-info-schema');
var Appointment = require('../db/appointment-schema');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

router.post('/send', function (req, res) {
    var seed = crypto.randomBytes(20);
    var authToken = crypto.createHash('sha1').update(seed + req.body.email).digest('hex');

    var newUser = new Appointment({
        email: req.body.email,
        fullname: req.body.fullname,
        department: req.body.department,
        preferedTime: req.body.preferedTime,
        day: req.body.day,
        date: req.body.date,
        time: req.body.time,
        specialnote: req.body.specialnote,
        phone: req.body.phone,
        preferedMedium: req.body.preferedMedium,
        authToken: authToken,
        isAuthenticated: false,
        notify: false
    });

    newUser.save(function (err, newUser) {
        if (err) {
            return console.error(err);
        }
    });

    var authenticationURL = 'http://localhost:2018/#/verify_email?token=' + newUser.authToken;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dental.solution2018@gmail.com',
            pass: 'dental-solution'
        }
    });
    const mailOptions = {
        from: 'dental.solution2018@gmail.com',
        to: 'dhruvm1@rediffmail.com',
        subject: 'Appointment',
        html: '<p> Full Name: <b>' + req.body.fullname + '</b></p>' + '<br/>' + '<p>Phone: <b>' + req.body.phone + '</b></p>' + '<br/>' + '<p>email: <b>' + req.body.email + '</b></p>' + '<br/>' + '<p>Department: <b>' + req.body.department + '</b></p>' + '<br/>' + '<p>Day: <b>' + req.body.day + '</b></p>' + '<br/>' + '<p>Prefered Time: <b>' + req.body.preferedTime + '</b></p>' + '<br/>' + '<p>Time: <b>' + req.body.time.hour + '</b> hours ' + '<b>' + req.body.time.minute + '</b> minutes </p>' + '<br/>' + '<p>Special Note: <b>' + req.body.specialnote + '</b></p>' + '<br/>' + '<p>Medium to Contact: <b>' + req.body.preferedMedium + '</b></p>' + '<br><br><a target=_blank href=\"' + authenticationURL + '\">Confirm Appointment</a>'
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            res.json([{ success: 'cool' }]);
    });
});

router.post('/verify_email', function (req, res) {
    console.log('verify_email token: ', req.body.token);
    Appointment.findOne({ authToken: req.body.token }, function (err, user) {
        if (err) { return console.error(err); }

        user.isAuthenticated = true;
        user.save(function (err) {
            if (err) return console.error(err);
            res.json([{ succes: true }]);
        });
    });
});


router.post('/get_history_data', function (req, res) {
    Appointment.find({ isAuthenticated: true, email: req.body.email }, function (err, user) {
        if (err) { return console.error(err); }
        else {
            res.json(user);
        }
    });
});

router.post('/get_history_data_notification', function (req, res) {
    Appointment.find({ isAuthenticated: true, email: req.body.email }, function (err, user) {
        if (err) { return console.error(err); }
        else {
            res.json(user);
        }
    });
});

router.post('/change_notify', function (req, res) {
    Appointment.find({ isAuthenticated: true, email: req.body.email, notify: false }, function (err, user) {
        if (err) { return console.error(err); }
        else {
            if (user.length == 0) {
                res.json([{ NoData: false }])
            }
            user.forEach(element => {
                element.notify = true;
                element.save(function (err) {
                    if (err) return console.log(err);
                });
                res.json(user);
            })
        }
    });
});


router.post('/patient-register', function (req, res) {
    const operation = require("../db/crud");
    operation.searchForRegistration(req.body, res);
});

router.post('/patient-login', function (req, res) {
    const operation = require("../db/crud");
    operation.searchForLogin(req.body, res);
});

router.post('/storePatientInformation', function (req, res) {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    else {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).send({ success: false, msg: 'Unauthorized.' });
            }
            else {
                var email = decoded['email'];
                var info = req.body;
                var infoOfPatient = new information(email, info);
                InfoSchema.add(infoOfPatient, res);
            }
        });
    }
});

router.post('/upload', function (req, res, next) {
    var path = '';
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        // No error occured.
        path = req.file.path;
        console.log(path);
        res.json([{ success: "Upload Completed for", path_of_file: path }]);
    });
});

router.post('/change_patient_profile', function (req, res) {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    else {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).send({ success: false, msg: 'Unauthorized.' });
            }
            else {
                var email_1 = decoded['email'];
                infochangeschema.find({ email: email_1 }, function (err, docs) {
                    if (err) {
                        console.log('error');
                    }
                    else {
                        docs[0].firstname = req.body.firstname;
                        docs[0].lastname = req.body.lastname;
                        docs[0].mobile_number = req.body.mobile_number;
                        docs[0].citizen = req.body.citizen;
                        docs[0].dob = req.body.dob;
                        docs[0].city = req.body.city;
                        docs[0].state = req.body.state;
                        docs[0].code = req.body.code;
                        docs[0].image = req.body.image;
                        docs[0].street_address = req.body.street_address;
                        docs[0].street_address2 = req.body.street_address2;
                        docs[0].save();
                        var token = jwt.sign(docs[0].toJSON(), config.secret, {
                            expiresIn: 86400
                        });
                        res.json([{ success: true, jwtToken: token }]);
                    }
                });
            }
        });
    }
});


router.post('/change_email', function (req, res) {
    var token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    else {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(401).send({ success: false, msg: 'Unauthorized.' });
            }
            else {
                var email_1 = decoded['email'];
                var token;
                User.find({ 'email': req.body.email }, function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (data.length == 0) {
                            User.find({ 'email': email_1 }, function (err, docs) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    if (docs.length != 0) {
                                        docs[0].email = req.body.email;
                                        docs[0].save();
                                    }
                                }
                            });

                            Chat.find({ 'email': email_1 }, function (err, docs) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    docs.forEach(element => {
                                        element.email = req.body.email;
                                        element.save();
                                    });
                                }
                            });

                            Appointment.find({ 'email': email_1 }, function (err, docs) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    docs.forEach(element => {
                                        element.email = req.body.email;
                                        element.save();
                                    });
                                }
                            });

                            infochangeschema.find({ 'email': email_1 }, function (err, docs) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    if (docs.length != 0) {
                                        docs[0].email = req.body.email;
                                        docs[0].save();
                                    }
                                    token = jwt.sign(docs[0].toJSON(), config.secret, {
                                        expiresIn: 86400
                                    });
                                    res.json([{ success: true, jwtToken: token }]);
                                }
                            });
                        }
                        else {
                            res.json([{ success: false }]);
                        }
                    }
                });

            }
        });
    }
});

module.exports = router;
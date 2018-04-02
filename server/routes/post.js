const express = require("express");
const router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var nodemailer = require("nodemailer");
var multer = require('multer');

var DIR = '../dist/assets/images';
var upload = multer({ dest: DIR }).single('photo');

var config = require('../db/database');
var information = require('../model/patient-info-model');
var InfoSchema = require('../db/patient-info-crud');
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

    var authenticationURL = 'http://localhost:3535/#/verify_email?token=' + newUser.authToken;

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
        console.dir(user);

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
})

module.exports = router;
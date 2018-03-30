const express = require("express");
const router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var config = require('../db/database');
var Appointment = require('../db/appointment-schema');

router.get('/authenticationToken', function (req, res) {
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
                return res.json([{ success: true, message: 'Token Authenticated.' }]);
            }
        });
    }
});

module.exports = router;
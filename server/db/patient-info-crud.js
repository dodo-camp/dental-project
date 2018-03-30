const Info = require('./patient-info-schema');
var MongoClient = require('mongodb').MongoClient;
var express = require('../app');
var jwt = require('jsonwebtoken');
var config = require('./database');
var passport = require('passport');
require('./passport')(passport);

const operations = {
    add(userObject, response) {
        var information = {
            email: userObject.email,
            firstname: userObject.info.firstname,
            lastname: userObject.info.lastname,
            mobile_number: userObject.info.mobile_number,
            gender: userObject.info.gender,
            citizen: userObject.info.citizen,
            dob: userObject.info.dob,
            street_address: userObject.info.street_address,
            street_address2: userObject.info.street_address2,
            landmark: userObject.info.landmark,
            city: userObject.info.city,
            state: userObject.info.state,
            code: userObject.info.code,
            image: userObject.info.image
        }
        Info.create(information, function (error) {
            if (error) {
                response.send("Can't Add a New User");
            }
            else {
                var token = jwt.sign(information, config.secret, {
                    expiresIn: 86400
                });
                response.json([{ success: true, infoToken: token }]);
            }
        });
    }
}
module.exports = operations;
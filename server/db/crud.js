const User = require('./schema');
const Info = require('./patient-info-schema');
var MongoClient = require('mongodb').MongoClient;
var express = require('../app');
var jwt = require('jsonwebtoken');
var config = require('./database');
var passport = require('passport');
require('./passport')(passport);

const operations = {
    add(userObject, response) {

        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync(11);
        var hash = bcrypt.hashSync(userObject.password, salt);
        userObject.password = hash;
        User.create(userObject, function (error) {
            if (error) {
                response.send("Can't Add a New User");
            }
            else {
                var email = { 'email': userObject.email };
                var token = jwt.sign(email, config.secret, {
                    expiresIn: 86400
                });
                response.json([{ success: true, token: token }]);
            }
        });
    },
    searchForRegistration(userObject, response) {
        User.find({ 'email': userObject.email }, function (error, docs) {
            if (error) {
                console.log("Something went wrong..");
            }
            else {
                if (docs.length == 0) {
                    operations.add(userObject, response);
                }
                else {
                    response.json([{ success: false }]);
                }
            }
        });
    },
    searchForLogin(userObject, response) {
        var bcrypt = require('bcryptjs');
        User.find({ 'email': userObject.email }, function (error, docs) {
            if (error) {
                console.log("Something went wrong..");
            }
            else {
                if (docs.length == 0) {
                    var success = [{
                        exist: false
                    }];
                    response.json(success);
                }
                else {
                    if (bcrypt.compareSync(userObject.password, docs[0].password)) {
                        Info.find({ 'email': userObject.email }, function (error, info) {
                            if (error) {
                                console.log("Something went wrong..");
                            }
                            else {
                                if (info.length == 0) {
                                    var token = jwt.sign(docs[0].toJSON(), config.secret, {
                                        expiresIn: 86400
                                    });
                                    response.json([{ exist: true, jwtToken: token }]);
                                }
                                else {
                                    var token = jwt.sign(info[0].toJSON(), config.secret, {
                                        expiresIn: 86400
                                    });
                                    response.json([{ exist: true, infoToken: token }]);
                                }
                            }
                        });
                    }
                    else {
                        var success = [{
                            exist: false
                        }];
                        response.json(success);
                    }
                }
            }
        });
    }
}
module.exports = operations;
//1.2 if user is not loggedIn we will show him all doubts 
var express = require('express');
var route = express.Router();
// A route defined now we may use as mini app
//This is what express offers
var mongoose = require('mongoose');
mongoose.createConnection('mongodb://localhost/supportSystem');

mongoose.connection.once('open', function(err) {
    if (err) throw err;
    console.log("successfully connected to database!");
})
var userModel = require('./../models/userModel.js')
var queries = require('./../models/queriesModel.js');
var fs = require('fs');

var events = require('events');
var eventEmitter = new events.EventEmitter();
//an module to email user for successful signup
//an external module to mail the user for his successful signup

//jade template to render email 
var jade = require('jade');

var emailSender = require('./../middleware/emailsender.js')
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');





//an export function
module.exports.controllerFunction = function(app) {
    //lets intialize sessions with cookie parser and express-session
    app.use(require('cookie-parser')());
    app.use(require('express-session')({
        secret: 'keyboard  cat',
        resave: true,
        saveUninitialized: true

    }));





    /**/
    //1. we will create a route to get all queries/tickets from database to client when he is not loggedIn
    ''
    route.get('/queries', function(req, res) {

            //1.3 User can click on any doubt and look at the conversations without auth
            if (req.session.user != 'admin') {

                queries.find({}, function(err, queries) {
                    if (err)
                        throw err;
                    else
                        res.json({
                            'status': 'notLoggedIn',
                            'queries': queries
                        });
                })





            } else
                redirect('/support/queries')



        })
        //1.4 User cannot post doubt ,if User wants to he must login


    route.get('/loggout', function(req, res) {
        delete req.session.user;
        res.json({ "loggdOut": true });
    })

    //a route to login the user
    route.post('/login', function(req, res) {
        //check if the user exist or not
        if (req.body.email != undefined && req.body.password != undefined) {
            if (req.body.email != 'yashkhrnr2@gmail.com' && req.body.password != 'pass123') {
                userModel.find({ $and: [{ email: req.body.email }, { password: req.body.password }] }, function(err, profile) {
                    if (err)
                        throw err;
                    else {
                        if (profile.length == 0) {
                            res.json({ "user": 'no user found' });
                        } else {
                            //lets create an cookie to store this information for future use
                            req.session.user = profile;
                            var myToken = jwt.sign({ username: req.body.username, password: req.body.password }, '9gag forever')
                            res.json({ "user": profile, "token": myToken });

                            //remember to save this token in frontEnd and use it whenever 
                            //interacting with server side APIs send it in authorization Headers
                            //i.e in third parameter of post request


                        }




                    }

                })
            } else {
                var myToken = jwt.sign({ username: req.body.email }, '9gag forever')


                req.session.user = 'admin'
                res.json({ "user": req.session.user, "token": myToken });
            }




        }



    })

    // a route to signup the user,here we also create an event to mail the user about his
    //successful signup
    //for that we will use nodemailer and event
    route.post('/signup', function(req, res) {
        //check if req.body.name ,password and email is blank or not
        if (req.body.email != undefined && req.body.name != undefined && req.body.password != undefined) {
            var user = new userModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            eventEmitter.on('signup', function() {
                //an export functions which sends email
                emailSender.FunctionToSendEmail(req.body.email, 'welcome-email.jade', 'Welcome to support!', req.body.name)
            })

            user.save(function(err, result) {

                eventEmitter.emit('signup');
                res.json(result)

            })
        }
    })








    //1.2 if user is not loggedIn we will show him all doubts i.e redirect to general dashboard
    app.use('/', route);



}

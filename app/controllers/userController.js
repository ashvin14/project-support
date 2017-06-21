//functionality:-1) anyone can access support system
//2) but to raise a ticket you need to be logged in i.e if an user wants to raise a doubt 
// or a query User has to login
//3) after login an user can see his queries only ,and he can raise an issue
//solution:- 
//we are going to define routes for authenticated user
//authentication of user is also done by middlewares also exchange of apis is secured 
//with JWT
//now we define CRUD operations for our user to help him manage his queries


var mongoose = require('mongoose');
var express = require('express');
// A route defined now we may use as mini app
//This is what express offers
var route = express.Router();
//middleware to check if user is loggedIn or not
//loaded all models ,and middlewares
var loggedIn = require('./../middleware/check_login.js');
mongoose.connect('mongodb://localhost/supportSystem');
var query = require('./../models/queriesModel.js');
var userModel = require('./../models/userModel.js')
var emailSender = require('./../middleware/emailsender.js')
var events = require('events');
var eventEmitter = new events.EventEmitter();
var ObjectId = mongoose.Types.ObjectId;
var Promise = require('bluebird')
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var disscussion = require('./../models/discussionModel.js')


//an export function
module.exports.controllerFunction = function(app) {


    //protecting the routes using JWT
    route.use("/", expressJWT({
        secret: '9gag forever'
    }));


    //verifying token using custom middleware

    /*route.use(function(err, req, res, next) {
        
           
            if (err.name === 'UnauthorizedError') {
                return res.status(403).send({
                    success: false,
                    message: 'No token provided.'
                });
            }
        })*/
    //a function to query db and return a particular query based on id

    var FunctionToReturnQuery = function(id) {

        //promises are used because we want this function to interpret synchronously
        return new Promise(function(resolve, reject) {
            //a query to find appropriate ticket using Query ID
            query.find({ _id: ObjectId(id) }, function(error, query) {
                if (error) throw error;
                else {


                    resolve(query);
                    //we supply it to next chain of methods
                }
            })
        })
    }
    var FunctionToReturnDiscussionBasedOnQuery = function(query) {
        //this function returns a discussion as well as query 
        return new Promise(function(resolve, reject) {
            //a query to find appropriate discussion for that query
         
            disscussion.find({ Query_id: ObjectId(query[0]._id) }, function(error, disscussion) {
                if (error) throw error;
                else {
                    
                    var querypost = {
                        Query: query,
                        disscussion: disscussion,
                        
                             
                        
                    }
                    resolve(querypost);



                }


            })
        })

    }

    var FunctionToGetEmailByQuery = function(query) {
        //it actually returns whole user instead of just Email


       
        return new Promise(function(resolve, reject) {
            userModel.findOne({ _id: ObjectId(query[0].Query_uploader) }, function(error, user) {
                if (error) throw error;
                resolve(user)
            })
        })
    }


    //1. we will create a route to get  queries/tickets only of 
    //particular user from database to client
    route.get('/queries', function(req, res) {
        // a basic route to return a json of all queries

        if (req.session.user != 'admin') {
            //it checks if api accessor is an admin or not 
            // if he is not admin then he gives him queries only associated with him.
            query.find({ Query_uploader: ObjectId(req.session.user[0]._id) }, function(error, queries) {
                if (error)
                    throw error;
                else
                    res.json(queries)
            })




        } else {
            //else he return all queries

            query.find({}, function(error, queries) {
                if (error)
                    throw error;
                else
                    res.json(queries)
            })

        }
        //this technique was used because we are in '/support' URI which is authenticated
        //now we can have two types in authentication either the user is normal i.e not admin
        //or the user is admin so instead of writing a seperate backEnd for admin
        //let us just check in every necessary route if the user is admin or not 
        // and just change the little functionality there itself






    })

    //an route to delete a query
    route.delete('/queries/delete/:id', function(req, res) {
            //we delete a query by its id 
            query.deleteOne({ _id: ObjectId(req.params.id) }, function(error, updatedqueries) {
                    if (error) throw error;
                    else

                        eventEmitter.on('delete_query', function() {
                            emailSender.FunctionToSendEmail(req.session.user[0].email, 'delete_query.jade', 'Query successfully deleted!', null)
                        })
                        //to let admin know about deletion of query by user
                        eventEmitter.emit('delete_query')
                })
                //also we delete associated disscussion with the query
                //make sure that this route is not accessed by admin
            disscussion.deleteOne({ Query_id: ObjectId(req.params.id) }, function(error, resutl) {
                if (error) throw error;
                else {
                    res.json({})
                }
            })
        }) //end of delete route


    //a route to edit the query
    //again make sure that it is inaccessible to admin
    //this can be done by hiding the button in frontEnd
    route.put('/queries/edit', function(req, res) {
            //saving latest changes in mongo
            query.findOneAndUpdate({ _id: req.body.id }, {
                $set: {
                    Query_status: req.body.Query_status,
                    Query_title: req.body.Query_title,
                    Query_details: req.body.Query_details,
                    tags: req.body.tags

                }
            }, function(error, result) {
                if (error) throw error
                else {

                    res.json(result)
                }

            })

        }) //end of put request
        //route to change status of query depending upon if the query is resolved 
        //in userEnd or not
    route.put('/queries/statusChanged', function(req, res) {
            //updating status of query
            query.findOneAndUpdate({ _id: req.body.id }, {
                $set: {
                    status: req.body.status
                }
            }, function(error, result) {
                if (error) throw error;
                else {
                    //sending mail to admin when the status is closed
                    eventEmitter.on('status_update', function() {
                        emailSender.FunctionToSendEmail('yashkhrnr2@gmail.com', 'status_email.jade', 'Query of ' + req.session.user[0].name + ' has resolved', req.session.user[0].name)
                    })
                    res.json(result);
                    eventEmitter.emit('status_update');
                }
            })
        }) //end of put route
    route.post('/queries/post', function(req, res) {
            //saving Query details in mongo

            if (req.body.Query_title != undefined && req.body.Query_details != undefined && req.body.tags != undefined ) {
                var ticket = new query({
                    Query_title: req.body.Query_title,
                    Query_details: req.body.Query_details,
                    tags: req.body.tags,
                    status: "open",
                    Query_uploader: req.session.user[0]._id,
                    date: new Date()

                })
                eventEmitter.on('query_post', function() {
                    //an export functions which sends email
                    emailSender.FunctionToSendEmail(req.session.user[0].email, 'Query_post_email.jade', 'Your Query has Successfully posted!');
                })


                ticket.save(function(error, Query) {
                    if (error)
                        throw error;
                    else { //Your Query has Successfully posted!

                        eventEmitter.emit('query_post')
                        res.json(Query)

                    }

                })
            }

        }) //end of post request
     route.get('/queries/:id', function(req, res) {
        FunctionToReturnQuery(req.params.id).then(FunctionToReturnDiscussionBasedOnQuery).then(function(response) {
            
            res.json({Data:response,user:req.session.user[0].name,user_id:req.session.user[0]._id})
        })

    })

    //end of get request
    route.post('/queries/discussion/post', function(req, res) {
       
        if (req.session.user != 'admin') {
            if (req.body.discussion_message != undefined) {
                var discussion = new disscussion({
                    date: new Date(),
                    discussion_message: req.body.discussion_message,
                    discussion_uploader: req.session.user[0]._id,
                    Query_id: req.body.id,
                    typeofuser: 'user'
                })

            }

            discussion.save(function(error, discussion) {
                if (error) throw error;
                else {
                    eventEmitter.on('discussion_post', function() {
                        emailSender.FunctionToSendEmail('yashkhrnr2@gmail.com', 'discussion_admin_email.jade', 'you have recieved an query', discussion._id)
                    })
                    eventEmitter.emit('discussion_post')
                    res.json(discussion)
                }
            })



        } else {


            var discussion = new disscussion({
                date: new Date(),
                discussion_message: req.body.discussion_message,

                Query_id: req.body.id,
                typeofuser: 'admin'
            })

            discussion.save(function(error, discussion) {
                if (error) throw error;
                else {

                    FunctionToReturnQuery(discussion.Query_id).then(FunctionToGetEmailByQuery).then(function(user) {
                        
                        eventEmitter.on('discussion_post', function() {
                            emailSender.FunctionToSendEmail(user.email, 'discussion_user_email.jade', 'you recieved an reply', discussion._id)
                        })
                        eventEmitter.emit('discussion_post')
                        res.json(discussion)
                    })

                }
            })

        }


    })







    //1.1 we use a middleware to check if the user is loggedIn or not
    //1.2 if user is not loggedIn we will show him all doubts i.e redirect him to general dashboard
    app.use('/support', loggedIn.check, route);



}

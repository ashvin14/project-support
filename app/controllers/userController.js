//functionality:-1) anyone can access support system
//2) but to raise a ticket you need to be logged in i.e if an user wants to raise a doubt 
// or a query User has to login
//3) after login an user can see his queries only ,and he can raise an issue
//solution:- 

var mongoose = require('mongoose');
var express = require('express');
// A route defined now we may use as mini app
//This is what express offers
var route = express.Router();
//middleware to check if user is loggedIn or not
var loggedIn = require('./../middleware/check_login.js');
mongoose.connect('mongodb://localhost/supportSystem');

//an export function
module.exports.controllerFunction = function(app){
//1. we will create a route to get  queries/tickets only of 
//particular user from database to client
 route.get('/queries',function(req,res){
 	

	
 	
 })

	
	//1.3 User can click on any doubt and look at the conversations
	//1.4 User cannot post doubt ,if User wants to User has to login




//1.1 we use a middleware to check if the user is loggedIn or not
//1.2 if user is not loggedIn we will show him all doubts i.e redirect him to general dashboard
app.use('/support',route);



}







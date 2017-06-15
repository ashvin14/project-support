var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userModel = new Schema({

	name :{type:String},
	password :{type:String},
	email: {type:String,unique:true},
	

    

})
var users = mongoose.model('userCollections', userModel);
module.exports = users;

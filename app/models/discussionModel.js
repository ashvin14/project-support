var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var discussion = new Schema({
	date : {type:Date},
	discussion_message:{type:String},
	disussion_uploader:{type:mongoose.Schema.Types.ObjectId },
	Query_id:{type:mongoose.Schema.Types.ObjectId},
	typeofuser:{type:String}


})
var discussionCollection = mongoose.model('discussionCollection',discussion);
module.exports = discussionCollection;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ticket = new Schema({
	Query_title:{type:String},
	Query_details:{type:String},
	tags:[{type:String}],
	status:{type:String},
	Query_uploader:{ type: mongoose.Schema.Types.ObjectId },
	date:{type:Date}

})
var queries = mongoose.model('queryCollections', ticket);
module.exports = queries;

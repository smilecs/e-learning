var mongoose = require('mongoose');
var mongodbURL = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/elearning';
var mongodbOptions = {};
var db = mongoose.connection;
db.on('error', console.error);
var Schema = mongoose.Schema;
mongoose.set('debug', true);
mongoose.connect(mongodbURL, mongodbOptions, function (err, res){
	if(err){
		console.log('Connection refused to ' + mongodbURL);
		console.log(err);
	} else {
		console.log('Connection successful to: ' + mongodbURL);
	}
});
//user schema
var Course = new Schema({
title: String,
course_code: String,
desc:String, 
level:Number,
department:String,
l_id:String    
});

var Staff = new Schema({
	email: String,
	name: String,
	username: String,
	password: String,
	contact:String,
	created: Number,
    dept:String,
    img_url:String
	});
	
var Assignment = new Schema({
		title: String,
		l_id:String,
		desc:String,
		course_code:String,
		created:Date,
        url:String
    });

var Book = new Schema({
    level:Number,
    course:String,
    title:String,
    url:String,
    department:String,
    course_name:String
   
});
var Courses = mongoose.model('Course', Course);


exports.courseModel = Courses;
exports.staffModel = mongoose.model('Staff', Staff);
exports.assignment = mongoose.model('Assignment', Assignment);
//var Search = mongoose.model('elastic', Search);
exports.bookModel = mongoose.model('Book', Book);
//shopModel = mongoose.model('Shop', Shop);

	

//the file should be named as singular 'comment.js' , not 'comments.js'

mongoose =require('mongoose');
const connection=require('../database/databaseConnection')
const commentSchema =new mongoose.Schema({
	user: String,
	text: String,
	dishId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'dish'
	}
});

const Comment =connection.model('Comment',commentSchema);

module.exports=Comment;
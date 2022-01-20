mongoose =require('mongoose');
const connection=require('../database/databaseConnection')
const dish_schema=require('./dish').schema
const cuisineSchema =new mongoose.Schema({
	dishes_link:String,
	dishes_info:[dish_schema],
	cuisine:String,	
	img_link:String,
});

const Cuisine =connection.model('Cuisine',cuisineSchema);

module.exports=Cuisine;
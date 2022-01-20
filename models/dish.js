//the file should be named as singular 'dish.js' , not 'dishes.js'

const mongoose = require('mongoose');
const connection=require('../database/databaseConnection')
const schema=new mongoose.Schema({
	name_of_dish: String,
	cuisine: String,
	ingredients: String,
	recipe: String,
	description: String,
	rating: Number,
	health_indicator: String,
	image: String,
});

schema.index({
	'$**':'text'
});

const Dish=connection.model('dish',schema);
module.exports.schema=schema;
module.exports = Dish;
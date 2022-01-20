// ==========================================================
//                       IMPORTS
// ==========================================================


//Npm imports
const express= require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
var methodOverride = require('method-override');
var morgan = require('morgan');
const session = require('express-session');
var passport = require('passport');
var crypto = require('crypto');


// Package documentation - https://www.npmjs.com/package/connect-mongo
// used to create a session in the database
const MongoStore = require('connect-mongo')(session);

//config imports
const config =require('./config.js');
const seed=require('./utils/seed.js');
const connection=require('./database/databaseConnection')

//route imports
const authenticationRoute=require('./routes/authentication.js')
const landingRoute=require('./routes/main.js')
const dishesRoute=require('./routes/dishes.js')
const commentsRoute=require('./routes/comments.js')

//model imports
const Dish=require('./models/dish.js');
const Comment=require('./models/comment.js')


// ==========================================================
//                       Development
// ==========================================================

// Morgan
app.use(morgan('tiny'))

// seed the DATABASE
// seed()

// ==========================================================
//                       Config
// ==========================================================



//making connection to mongodb atlas
// mongoose.connect(config.db.connection);

//Express Config
app.set('view engine','ejs');
app.use(express.static('public'));

// bodyParser Config
app.use(bodyParser.urlencoded({extended:true}));

// methodOverride Config
app.use(methodOverride('_method'))


/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore=new MongoStore({mongooseConnection: connection, collection:'sessions'});
app.use(session({
	secret: 'jhjhkjdhskjhfkjdhfkjsgdfgsd',
	resave: false,
	saveUninitialized:true,
	store:sessionStore,
	cookie:{
		maxAge: 1000*60*60*24 //equals 1day
	}
}));

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */
// Need to require the entire Passport config module so app.js knows about it
require('./authentication/passport');
app.use(passport.initialize());//reloads the session each time we visit a route
app.use(passport.session());//reloads the session each time we visit a route


//current user middleware , lets you access the user in every single route, without explicity passing it each ejs file
app.use((req,res,next)=>{
	res.locals.user=req.user;
	next();
})


//routes Config
app.use(authenticationRoute)
app.use(landingRoute)
app.use('/dishes',dishesRoute)
app.use('/dishes/:id/comments',commentsRoute)

// ==========================================================
//                       Listen
// ==========================================================
var port = process.env.PORT || 3000;
app.listen(port,()=>{
	console.log('app is listening')
});

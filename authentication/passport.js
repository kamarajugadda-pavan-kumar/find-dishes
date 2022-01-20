const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../database/databaseConnection');
const User = require('../models/user');
// const validPassword=require('../lib/passwordUtils').validPassword;
const crypto = require('crypto');

// TODO
function validPassword(password, hash, salt) {
	var hashVerify=crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
	return hash===hashVerify;
}



//the passport-local strategy by default looks for keys 'username' and 'password'
//if you want to customize it use customFields as above
const verifyCallback=(username,password,done)=>{
	User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!validPassword(password,user.hash,user.salt)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
}


const strategy=new LocalStrategy(verifyCallback);

passport.use(strategy);

// this puts userid in req.session , when passport.authenticate() is executed
passport.serializeUser((user,done)=>{
	done(null, user.id);
});


// this populates the req.user with details of user from data base
passport.deserializeUser((userId,done)=>{
	User.findById(userId)
	.then((user)=>{
		done(null,user);
	})
	.catch((err)=>{
		done(err)
	})
})


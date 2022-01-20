const express=require('express')
const router= express.Router()
const User=require('../models/user')
const crypto = require('crypto');
const passport=require('passport')
const Cuisine=require('../models/cuisine')


function genPassword(password) {
	const salt=crypto.randomBytes(32).toString('hex');
	const genHash=crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
	
	return{
		salt:salt,
		hash: genHash
	};
}

router.get('/signup',(req,res)=>{
	res.render('landing_signup')
})

router.get('/login',async(req,res)=>{
	const cuisines=await Cuisine.find().exec();
	res.render('landing_login',{cuisines})
})


router.post('/signup',(req,res,next)=>{
	const saltHash=genPassword(req.body.password)
	 
	 const salt=saltHash.salt;
	 const hash=saltHash.hash;
	 
	 const newUser=new User({
		 username:req.body.username,
		 hash:hash,
		 salt:salt,
		 Admin: false
		});
	
	newUser.save()
	 .then((user)=>{
		 console.log(user);
	 });
	 
	 res.redirect('/login')
	 })

router.post('/login',passport.authenticate('local',{failureRedirect:'/login',successRedirect:'/dishes'}))

router.get('/logout',(req,res)=>{
	req.logout();
	res.redirect('/')
})
module.exports=router
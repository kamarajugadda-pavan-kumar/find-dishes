const express=require('express')
const router=express.Router()
const Cuisine=require('../models/cuisine')

router.get('/',(req,res)=>{
	res.redirect('/login');
});

router.get('/cuisines',async (req,res)=>{
	const cuisines=await Cuisine.find().exec();
	res.render('cuisines.ejs',{cuisines});
})

module.exports=router
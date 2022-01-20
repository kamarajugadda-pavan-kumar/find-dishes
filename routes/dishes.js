const express=require('express')
const router=express.Router({mergeParams:true})
const Dish=require('../models/dish.js')
const Comment=require('../models/comment.js')
const isAuth=require('../authentication/authorizationMiddleware').isAuth


router.get('',isAuth,async (req,res)=>{
	try{
		founddishes=await Dish.find().exec();
		res.render('dishes',{founddishes});
	}catch(err){
		console.log(err)
		res.send(err)
	}
});

router.post('',isAuth,async (req,res)=>{
	const new_item={
		name_of_dish: req.body.name_of_dish,
		cuisine: req.body.cuisine,
		ingredients: req.body.ingredients,
		recipe:
		req.body.recipe,
		description: req.body.description,
		rating: req.body.rating,
		health_indicator: req.body.health_indicator,
		image: req.body.image,
	}
	
	try{
		const dish= await Dish.create(new_item);
		res.redirect('/dishes')
	}catch(err){
		console.log(err)
		res.redirect('/dishes')
	}
})

router.get('/new',isAuth,async(req,res)=>{
	res.render('add_dish.ejs');
})

router.get('/search',isAuth,async(req,res)=>{
	try{
		const searchedDishes= await Dish.find({
			$text:{
				$search:req.query.search_term
			}
		})
		res.render('dishes',{founddishes:searchedDishes})
	}catch(err){
		console.log(err)
		res.redirect('/dishes')
	}
})

router.get('/:id',isAuth,async (req,res)=>{
	try{
		const dishInfo=await Dish.findById({_id: req.params.id});
		const foundComments=await Comment.find({dishId:req.params.id}).exec();
		res.render('dish',{dishInfo:dishInfo,foundComments:foundComments});
	}catch(err){
		console.log(err);
		res.redirect('/dishes');
	}
})

router.get('/:id/edit',isAuth,async(req,res)=>{
	
	try{
		const edit_dish=await Dish.findById({_id:req.params.id}).exec();
		res.render('edit_dish_page',{edit_dish});
	}catch(err){
		console.log(err);
		res.send('you broke it dishes/id/edit');
	}
})

router.put('/:id/update',isAuth,async (req,res)=>{
	const update_item={
		name_of_dish: req.body.name_of_dish,
		cuisine: req.body.cuisine,
		ingredients: req.body.ingredients,
		recipe: req.body.recipe,
		description: req.body.description,
		rating: req.body.rating,
		health_indicator: req.body.health_indicator,
		image: req.body.image,
	}
	
	try{
		const updated_dish=Dish.findByIdAndUpdate(req.params.id,update_item,{new:true}).exec();
		res.redirect(`/dishes/${req.params.id}`)
	}catch(err){
		console.send(err);
	}
})

router.delete('/:id/delete',isAuth,async(req,res)=>{
	try{
		await Dish.findByIdAndDelete({_id:req.params.id}).exec();
		res.redirect('/dishes');
	}catch(err){
		console.log(err);
		res.redirect('/dishes');
	}
})
module.exports = router;
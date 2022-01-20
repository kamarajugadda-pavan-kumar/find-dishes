const express=require('express')
const router=express.Router({mergeParams: true})
const Comment=require('../models/comment.js')
const isAuth=require('../authentication/authorizationMiddleware').isAuth

router.get('/new',isAuth,(req,res)=>{
	res.render('add_comments',{dish_id:req.params.id})
})

router.post('',isAuth,async (req,res)=>{
	try{
		const newComment=await Comment.create({user: req.body.username, text: req.body.comment, dishId:req.body.dish_id});
		console.log(newComment);
		res.redirect(`/dishes/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.redirect(`/dishes/${req.params.id}`);
	}
})

router.get('/:commentId/edit',isAuth,async (req,res)=>{
	try{
		const foundComment=await Comment.findById({_id:req.params.commentId});
		console.log(foundComment);
		res.render('edit_comment',{dish_id:req.params.id,foundComment});
	}catch(err){
		console.log(err);
		res.redirect(`/dishes/${req.params.id}`);
	}
})

router.put('/:commentId/edit',isAuth,async (req,res)=>{
	
	try{
		const updated_comment=await Comment.findOneAndUpdate(req.params.commentId,{$set:{text:req.body.comment}},{new:true}).exec();
		res.redirect(`/dishes/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.redirect(`/dishes/${req.params.id}`)
	}
})

router.delete('/:commentId/delete',isAuth,async (req,res)=>{
	try{
		await Comment.findByIdAndDelete(req.params.commentId);
		res.redirect(`/dishes/${req.params.id}`)
	}catch(err){
		console.log(err);
		res.redirect(`/dishes/${req.params.id}`);
	}
});
module.exports = router;
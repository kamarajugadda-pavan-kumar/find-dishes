module.exports.isAuth=(req,res,next)=>{
	if (req.isAuthenticated()){
		next();
	}else{
		res.redirect('/login')
		// res.status(401).json({msg:'you are not authorized,please login to view delicious dishes'})
	}
};


module.exports.isAdmin=(req,res,next)=>{
	if (req.isAuthenticated() && req.user.Admin){
		next();
	}else{
		res.status(401).json({msg:'you are not admin'})
	}
}
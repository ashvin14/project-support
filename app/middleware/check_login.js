exports.check = function(req,res,next){

	if(req.session.user){
		//check if the user is logged in or not
	
		
		next();
	}
	else 
		//else redirect him
		 res.redirect('/queries');
		
}
exports.check = function(req,res,next){

	if(req.user){
	
		
		next();
	}
	else 
		 res.redirect('/queries');
		
}
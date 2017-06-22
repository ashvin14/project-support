
myApp.controller('signupController',function(apiservice,$window){
	var main = this;
	main.email;
	main.password;
	main.name;
	//lets fetch all info and post it
	this.postSignupDetails = function(){
		//create an object user to post signup details
		if(main.email == "" || main.password == "" || main.name== ""){
			alert('please dont keep anything blank')
			return null;
		}
		var user = {
			email:main.email,
			password:main.password,
			name:main.name
		}


		apiservice.postSignupDetails(user).then(function(response){
			$window.location = "#/signin"

		})
	}

})
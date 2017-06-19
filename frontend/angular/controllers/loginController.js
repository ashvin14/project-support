myApp.controller('loginController',function(apiservice,$window){
	var main = this;
	this.email;
	this.password;
	this.verify=false
	this.postLoginDetails = function(){
		//ld stands for loginDetails
		var ld = {
			email:main.email,
			password:main.password
		}
		//post login 


		apiservice.postLoginDetails(ld).then(function(response){
			//check for incorrect User
			
			if(response.data.user == "no user found"){
				main.verify = true;

			}
			else{
				$window.sessionStorage.token = response.data.token;
				console.log($window.sessionStorage.token)
			}
			//no this should not be the after-login route
			//create a seperate view for after-login route
			$window.location="#/"

		})

	}
})

myApp.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
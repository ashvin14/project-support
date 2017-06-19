myApp.service('apiservice',function($http){
		this.getAllQueriesWithoutSignin = function(){
			return $http({
				method:'GET',
				url:'./queries'
			})

		}
		this.loggout= function(){
			return $http({
				method:'GET',
				url:'./loggout'
			})

		}
		this.postLoginDetails = function(user){
			return $http({
				method:'POST',
				data : user,
				url :'./login'
			})
		}
})
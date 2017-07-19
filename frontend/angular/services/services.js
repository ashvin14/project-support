myApp.service('apiservice',function($http){
		this.getAllQueriesWithoutSignin = function(){
			return $http({
				method:'GET',
				url:'http://localhost:8000/queries'
			})

		}
		this.loggout= function(){
			return $http({
				method:'GET',
				url:'http://localhost:8000/loggout'
			})

		}
		this.postLoginDetails = function(user){
			return $http({
				method:'POST',
				data : user,
				url :'http://localhost:8000/login'
			})
		}
		this.postSignupDetails = function(user){
			return $http({
				method:'POST',
				data:user,
				url:'http://localhost:8000/signup'
			})
		}
		this.getAuthenticatedQueries = function(){
			return $http({
				method:"GET",
				url:'http://localhost:8000/support/queries'
			})
		}
		this.isUserLoggedIn = function(){
			return $http({
				method:'GET',
				url:'http://localhost:8000/isLoggedIn'
			})
		}
		this.getAllQueriesWithSignin = function(){
			return $http({
				method:"GET",
				url:'http://localhost:8000/support/queries'
			})
		}
		this.getSingleQueryWithSigin = function(id){
			return $http({
				method:'GET',
				url:'http://localhost:8000/support/queries/'+id

			})
		}
		this.postReplyByUser = function(data){
			return $http({
				method:'POST',

				data:data,
				url:'http://localhost:8000/support/queries/discussion/post'
			})
		}
		this.putStatusChange = function(data){
			return $http({
				method:'PUT',
				data:data,
				url:'http://localhost:8000/support/queries/statusChanged'
			})
		}
		this.getSingleQueryWithoutSigin = function(id){
			return $http({
				method:'GET',
				url:'http://localhost:8000/queries/'+id
			})
		}
		this.postQuery = function(data){
			return $http({
				method:'POST',
				url:'http://localhost:8000/support/queries/post',
				data:data
			})
		}
	})

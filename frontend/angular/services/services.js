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
		this.postSignupDetails = function(user){
			return $http({
				method:'POST',
				data:user,
				url:'./signup'
			})
		}
		this.getAuthenticatedQueries = function(){
			return $http({
				method:"GET",
				url:'./support/queries'
			})
		}
		this.isUserLoggedIn = function(){
			return $http({
				method:'GET',
				url:'./isLoggedIn'
			})
		}
		this.getAllQueriesWithSignin = function(){
			return $http({
				method:"GET",
				url:'./support/queries'
			})
		}
		this.getSingleQueryWithoutSigin = function(id){
			return $http({
				method:'GET',
				url:'./support/queries/'+id

			})
		}
		this.postReplyByUser = function(data){
			return $http({
				method:'POST',

				data:data,
				url:'./support/queries/discussion/post'
			})
		}
		this.putStatusChange = function(data){
			return $http({
				method:'PUT',
				data:data,
				url:'./support/queries/statusChanged'
			})
		}
	})

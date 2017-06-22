

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
           
        	templateUrl		: 'views/query-without-signin.html',
        	
            controller 		: 'unSignedController',
          
        	controllerAs 	: 'queryCtrl'
        })
        .when('/signin',{
        	templateUrl     : 'views/login-form.html',
            controller:'loginController'
        	
        })
        .when('/signup',{

        	templateUrl     : 'views/signup-form.html',
        	controller 		: 'signupController',
        	controllerAs 	: 'signupCtrl'
        })
        .when('/loggedIn/queries',{
            templateUrl :'views/query-with-signin.html',
            controller:'SignedController',
            controllerAs:'queryCtrl'
            
        })
        .when('/query/:id',{
            templateUrl:'views/single-query-without-signin.html',
            controller :'singleWithoutsiginController',
            controllerAs:'singleCtrl'

            
            
        })
        .when('/loggedIn/query/:id',{
            templateUrl:'views/single-query.html',
            controller:'singleController',
            controllerAs:'singleCtrl'

        })
        .when('/loggedIn/upload',{
            templateUrl:'views/query-upload.html',
            controller:'queryUploadController',
            controllerAs:'queryUpload'

        })
        
        /*
        .when('/edit/:id',{

            templateUrl     : 'views/edit-view.html',
            controller      :  'editBlogController',
            controllerAs    : 'editBlgCtrl'
        })
*/
        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);

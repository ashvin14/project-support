//var app = angular.module('ecommApp', ['ngRoute']); 

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
           
        	templateUrl		: 'views/query-without-signin.html',
        	
            controller 		: 'unSignedController',
          
        	controllerAs 	: 'queryCtrl'
        })
        .when('/signin',{
        	templateUrl     : 'views/login-form.html',
        	controller 		: 'loginController',
        	controllerAs 	: 'loginCtrl'
        })
        .when('/products',{

        	templateUrl     : 'views/products-view.html',
        	controller 		: 'productController',
        	controllerAs 	: 'productCtrl'
        })
        .when('/product/:id',{
            templateUrl :'views/singleProduct.html',
            controller:'singleProductController',
            controllerAs:'singleProductCtrl'
            
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
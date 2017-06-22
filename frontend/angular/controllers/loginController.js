myApp.controller('loginController', function(apiservice, $window, $interval) {
    var main = this;
    this.email;
    this.password;
    this.verify = false;

    var flag = 0;
     if($window.sessionStorage.token)
        $window.location="#/loggedIn/queries"

    this.correctCredentails = true;
    //function to check email authenication with api using post service
    this.postLoginDetails = function() {
        //ld stands for loginDetails
        if (main.email == "" || main.password == "") {
            alert('please dont keep anything blank')
            return null;
        }
        //if user logged in main.verify =>true
        //else main.verify=>false

        var ld = {
                email: main.email,
                password: main.password
            }
            //post login 



        apiservice.postLoginDetails(ld).then(function(response) {
            //check for incorrect User

            if (response.data.user == "no user found") {
                main.correctCredentails = false;
                return;

            } else {
                $window.sessionStorage.token = response.data.token;

                $window.location ="#/loggedIn/queries"


            }
            //no this should not be the after-login route
            //create a seperate view for after-login route

            


        })


    }

    //little bit of trick here
    //inorder to change contents of header where the other controller is used 
    //whose scope is different than our main(view controller) controller
    //we do here is checking with every 200ms to detect for a change in login status 
    //if the user is loggedIn the header contents are changed
    //else they are not this is done by $interval module inbuilt with Angualrjs


    $interval(function() {
        if ($window.sessionStorage.token) {

            main.verify = true;
        }

    }, 200)


    //api to loggout the user when he presses logout link
    this.loggout = function() {
        apiservice.loggout().then(function(response) {
            delete $window.sessionStorage.token
            $window.location = "#/";
            main.verify = false
        })
    }



})
//a factory or service may be used to supply authorization headers to backEnd as
// soon  as login is done
myApp.factory('authInterceptor', function($rootScope, $q, $window) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;

            }
            return config;
        },
        response: function(response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
});

myApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});

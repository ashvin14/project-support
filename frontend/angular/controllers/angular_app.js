var myApp = angular.module('supportApp', ['ngRoute']);
myApp.controller('unSignedController', function(apiservice,$window) {
    if($window.sessionStorage.token)
        $window.location="#/loggedIn/queries"
    var main = this;
    this.queries = [];
    this.statusLogin = false;
    //now we will start fetch info from api and paste it in view
    apiservice.getAllQueriesWithoutSignin().then(function(response) {
            //check if the user is loggedIn or not
            if (response.data.status == 'notLoggedIn')
                main.statusLogin = false
            else main.statusLogin = true
                //now pull all queries from API
            
            main.queries = response.data.queries;

            //to seperate comma seperated tags
            for (var query in main.queries) {

                main.queries[query].tags = main.queries[query].tags[0].split(',');

            }
            

        })
        
    


})
myApp.controller('SignedController',function(apiservice){
    var main = this;
    this.queries = [];
    main.statusLogin = true;
    apiservice.getAllQueriesWithSignin().then(function(response){

        main.queries = response.data;

        if (response.data.status == 'notLoggedIn')
                main.statusLogin = false
            else main.statusLogin = true
                //now pull all queries from API

            //to seperate comma seperated tags
            for (var query in main.queries) {

                main.queries[query].tags = main.queries[query].tags[0].split(',');

            }
           

    })
})

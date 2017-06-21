var myApp = angular.module('supportApp', ['ngRoute','angularTrix']);
myApp.controller('unSignedController', function(apiservice, $window) {
    if ($window.sessionStorage.token)
        $window.location = "#/loggedIn/queries"
    var main = this;
    this.queries = [];
    this.statusLogin = false;
    this.tab=0;
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
myApp.controller('SignedController', function(apiservice) {
    var main = this;
    this.queries = [];
    this.tab = 0;
    main.statusLogin = true;
    apiservice.getAllQueriesWithSignin().then(function(response) {

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
myApp.filter('statusFilter', function() {


    return function(input, tab) {
       
        var output = [];
        for (var index in input) {
            
            if (input[index].status == 'open' && tab == 1){

                output.push(input[index])
            }
            else if(input[index].status == 'closed' && tab == 2){
                
                output.push(input[index])
            }
            
            if(tab == 0){
                output.push(input[index])
            }
        }
    
    return output;

}


})

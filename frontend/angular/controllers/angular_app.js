var myApp = angular.module('supportApp', ['ngRoute']);
myApp.controller('unSignedController', function(apiservice) {
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
            console.log(main.statusLogin)
            main.queries = response.data.queries;

            //to seperate comma seperated tags
            for (var query in main.queries) {

                main.queries[query].tags = main.queries[query].tags[0].split(',');

            }
            console.log(response.data)


        })
        //api to loggout the user when he presses logout link
    this.loggout = function() {
        apiservice.loggout().then(function(response) {
            window.location = "#/";
        })


    }


})

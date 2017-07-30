var myApp = angular.module('supportApp', ['ngRoute', 'angularTrix']);
/*
*two controllers in same file because they share same functionality





*/


myApp.controller('unSignedController', function(apiservice, $window) {
    if ($window.sessionStorage.token)
        $window.location = "#/loggedIn/queries"
    var main = this;
    this.queries = [];
    this.statusLogin = false;
    this.tab = 0;
    this.query_length =true;
    //now we will start fetch info from api and paste it in view
    apiservice.getAllQueriesWithoutSignin().then(function(response) {
        //check if the user is loggedIn or not
        try {
            main.query_length= false;
            console.log(main.queries)
            if (response.data.status == 'notLoggedIn')
                main.statusLogin = false
            else main.statusLogin = true
            //now pull all queries from API

            main.queries = response.data.queries;

            //to seperate comma seperated tags
            for (var query in main.queries) {
                


                main.queries[query].tags = main.queries[query].tags[0].split(',');

            }
            if (main.queries.length == 0) {
                throw "so far no query is published";
            }


        }
        catch(err){
            main.query_length = true;
        }


    })




})
myApp.controller('SignedController', function(apiservice, $window) {
    var main = this;
    this.queries = [];
    this.tab = 0;
    this.query_length = true;
    main.statusLogin = true;
    if ($window.sessionStorage.token == undefined) {
        window.location = "#/"
    }
    apiservice.getAllQueriesWithSignin().then(function(response) {
        main.query_length = false;
        main.queries = response.data;
        try {
            console.log(main.queries)
            if (response.data.status == 'notLoggedIn')
                main.statusLogin = false
            else main.statusLogin = true
            //now pull all queries from API

            //to seperate comma seperated tags
            for (var query in main.queries) {
                


                main.queries[query].tags = main.queries[query].tags[0].split(',');

            }
            //error handled
            if (main.queries.length == 0) { 
                throw "so far no query is published";
            }


        } catch (err) {

            main.query_length =true;

        }


    })

})
myApp.filter('statusFilter', function() {


    return function(input, tab) {

        var output = [];
        for (var index in input) {

            if (input[index].status == 'open' && tab == 1) {

                output.push(input[index])
            } else if (input[index].status == 'closed' && tab == 2) {

                output.push(input[index])
            }

            if (tab == 0) {
                output.push(input[index])
            }
        }

        return output;

    }


})
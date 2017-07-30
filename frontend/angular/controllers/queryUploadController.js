
//as name suggests so is the function of controller
myApp.controller('queryUploadController', function(apiservice,$window) {
    var main = this;
    this.query_details;
    this.query_title;
    this.tags;
    //check if the user is loggedIn 
    if($window.sessionStorage.token == undefined){
        $window.location ="#/"
    }
    // functon to post query
    this.postQuery = function() {
        if (main.query_title != undefined && main.query_details != undefined && main.tags != undefined) {
            var query = {
                Query_title: main.query_title,
                Query_details: main.query_details,

                tags: main.tags
            }
            
            apiservice.postQuery(query).then(function(response) {
            	
                window.location = "#/loggedIn/queries"
            })
        }

    }
})

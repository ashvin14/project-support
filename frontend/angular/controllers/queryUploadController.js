myApp.controller('queryUploadController', function(apiservice) {
    var main = this;
    this.query_details;
    this.query_title;
    this.tags;
    this.postQuery = function() {
        if (main.query_title != undefined && main.query_details != undefined && main.tags != undefined) {
            var query = {
                Query_title: main.query_title,
                Query_details: main.query_details,

                tags: main.tags
            }
            console.log(query)
            apiservice.postQuery(query).then(function(response) {
            	console.log(response)
                window.location = "#/loggedIn/queries"
            })
        }

    }
})

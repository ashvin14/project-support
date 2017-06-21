myApp.controller('singleController', function(apiservice, $routeParams, $window, $sce) {
    var main = this;
    this.query = [];
    this.discussion = [];
    var query_id;
    this.replyByUser;
    this.user;
    apiservice.getSingleQueryWithSigin($routeParams.id).then(function(response) {

        main.query = response.data.Data.Query[0];
        main.discussion = response.data.Data.disscussion;
        console.log(main.query)

        main.query.html_Query_details = $sce.trustAsHtml(main.query.Query_details)


        main.discussion.forEach(function(discussion) {

            discussion.html_discussion_message = $sce.trustAsHtml(discussion.discussion_message);
            
        })

        query_id = main.query._id;


        main.user = response.data.user;
        main.user_id = response.data.user_id;

        
            //to seperate comma seperated tags
        for (var query in main.query) {

            main.query.tags = main.query.tags[0].split(',');

        }
    })

    this.postReplyByUser = function() {
        var Reply = {
            id: query_id,
            discussion_message: main.replyByUser
        }

        apiservice.postReplyByUser(Reply).then(function(response) {
            window.location = "#/loggedIn/queries"

        })


    }
    this.closeQuery = function() {
        var Status = {
            id: query_id,
            status: 'closed'
        }
        apiservice.putStatusChange(Status).then(function(response) {
            $window.location = "#/loggedIn/queries"
        })
    }
})
myApp.controller('singleWithoutsiginController', function(apiservice, $routeParams, $window,$sce) {

    var main = this;
    this.query = [];
    this.discussion = [];
    var query_id;
    this.replyByUser;
    this.user;
    apiservice.getSingleQueryWithoutSigin($routeParams.id).then(function(response) {

        main.query = response.data.Data.Query[0];
        main.discussion = response.data.Data.disscussion;


        main.discussion.forEach(function(discussion) {

            discussion.html_discussion_message = $sce.trustAsHtml(discussion.discussion_message);
            console.log(discussion.html_discussion_message)
        })

        query_id = main.query._id;


      
        

       
            //to seperate comma seperated tags
        for (var query in main.query) {

            main.query.tags = main.query.tags[0].split(',');

        }
    })

   
    
})

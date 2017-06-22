//this controller is for viewing single query and discussion when not loggedIn
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

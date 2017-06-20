myApp.directive('contenteditable', ['$sce', function($sce) {
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return; // do nothing if no ng-model

      // Specify how UI should be updated
      ngModel.$render = function() {
        element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
      };

      // Listen for change events to enable binding
      element.on('blur keyup change', function() {
        scope.$evalAsync(read);
      });
      read(); // initialize

      // Write data to the model
      function read() {
        var html = element.html();
        // When we clear the content editable the browser leaves a <br> behind
        // If strip-br attribute is provided then we strip this out
        if ( attrs.stripBr && html == '<br>' ) {
          html = '';
        }
        ngModel.$setViewValue(html);
      }
    }
  };
}]);

myApp.controller('singleController', function(apiservice, $routeParams,$window) {
    var main = this;
    this.query = [];
    this.discussion = [];
    var query_id;
    this.replyByUser;
    this.user;
    apiservice.getSingleQueryWithoutSigin($routeParams.id).then(function(response) {
      
        main.query = response.data.Data.Query[0];
        main.discussion = response.data.Data.disscussion;
        
        query_id = main.query._id;


        main.user= response.data.user;


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
    this.closeQuery = function(){
      var Status={
        id:query_id,
        status:'closed'
      }
      apiservice.putStatusChange(Status).then(function(response){
        $window.location = "#/loggedIn/queries"
      })
    }
})

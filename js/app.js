(function() {
  var app = angular.module('proCon', []);

  app.controller('ListController', function($scope){
    $scope.listItems = [];
    $scope.addListItem = function() {
      $scope.listItems.push($scope.userInput);
    };
  });

    app.controller('ResultsController', function(){
    this.list = list;
  });

  var list = [{
      name: 'Pros',
      hint: "Your pros go here",
      listItem: [{
        weight: 0,
        text: ""
      }],
      name: 'Cons',
      hint: "Your cons go here",
      listItem: [{
        weight: 0,
        text: ""
      }],
      name: 'Results',
      hint: "This displays your results",
      listItem: [{
        prosText: "5 Pros",
        consText: "6 Cons",
        resultsText: "You shouldn't do it",
        percentage: 0
      }]      
    }];
})();

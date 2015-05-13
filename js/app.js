(function() {

  var app = angular.module('proCon', ['ngDraggable']);

  app.controller('MainCtrl', function($scope, $http){
    $scope.proListItems = [];
    $scope.conListItems = [];
    $scope.draggableObjects = [];
    $scope.userInput;
    var successCallback;

    $scope.addProListItem = function() {
      if ($scope.userInput.length > 0) {
        $scope.proListItems.push($scope.userInput);
        $scope.userInput = null;
        $scope.draggableObjects.push($scope.userInput);
      }
    };

    $scope.addConListItem = function() {
      if ($scope.userInput.length > 0) {
        $scope.conListItems.push($scope.userInput);
        $scope.userInput = null;
        $scope.draggableObjects.push($scope.userInput);
      }
    };

    $scope.onDragComplete=function(data, evt, index){
       console.log("drag success, data:", data);
    }

    $scope.onDropComplete=function(data, evt, index){
        console.log("drop success, data:", data);
        var otherObj = $scope.draggableObjects[index];
        var otherIndex = $scope.draggableObjects.indexOf(data);
        $scope.draggableObjects[index] = data;
        $scope.draggableObjects[otherIndex] = otherObj;
    }    

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

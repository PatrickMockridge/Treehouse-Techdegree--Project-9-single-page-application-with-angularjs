(function() {

'use strict';

angular.module("app")

.controller('RecipeDetailController', ['$scope', 'dataService', '$location', '$routeParams', function($scope, dataService, $location, $routeParams) {
  // gets the recipe ID from the url routeparams
  $scope.ID = $routeParams.id;
  // get recipe by id
  $scope.getID = function() {
    dataService.getID($scope.ID, function(response) {
      console.log(response.data);
      $scope.recipe = response.data;
    });
  };
  $scope.getID();
  // get all categories
  dataService.getCategory(function(response) {
    console.log(response.data);
      $scope.getCategory = response.data;
        });
  // add an ingredient in the client local memory
  $scope.addIngredient = function() {
    $scope.recipe.ingredients.push({
      foodItem: "New Item",
      condition: "New Item",
      amount: "New Item"
    });
  };
  // delete ingredient in the client local memory
  $scope.deleteIngredient = function(index) {
    $scope.recipe.ingredients.splice(index, 1);
  }
// add a new step in client local memory
$scope.newStep = function() {
  $scope.recipe.steps.push({description: "New Step"});
  console.log($scope.recipe.steps);
};
// delete a step in client local memory
  $scope.deleteStep = function(index) {
    $scope.recipe.steps.splice(index, 1);
  }
  // save recipe
  $scope.saveRecipe = function() {
    dataService.putID($scope.recipe._id, $scope.recipe, function(response) {
        console.log(response.data);
        $scope.recipe = response.data;
          }, function(reason) {
            console.log(reason);
            $scope.errors = [];
             for (var error in reason.data.errors) {
                 console.log(reason.data.errors[error][0]);
                 $scope.errors.push(reason.data.errors[error][0].userMessage)
               }
             });
           };

        $scope.goBack = function() {
          $location.url('/#')
        };

        dataService.getFoodItems(function(response) {
          console.log(response.data);
          $scope.foodItems = response.data;
        });

}]);
})();

(function() {

'use strict';

angular.module("app")

.controller('RecipesController', ['$scope', 'dataService', '$location', function($scope, dataService, $location) {
  // gets all the recipes and assigns them to the scope.recipes for display in the view
   dataService.getRecipes(function(response) {
     console.log(response.data);
     $scope.recipes = response.data;
   });
   //instantiates category and id variables
   $scope.category = null;
   $scope.id = null;
    // gets a particular category of recipes and assigns them to the scope.recipes for display in the view
    $scope.getCategoryOfRecipes = function() {
        console.log($scope.category);
        dataService.getCategoryOfRecipes($scope.category, function(response) {
          console.log(response.data)
          $scope.recipes = response.data
        });
   };
   // gets all the categories and assigns them to the scope.getCategory
   dataService.getCategory(function(response) {
     console.log(response.data);
     $scope.getCategory = response.data;
   });
   // deletes a recipe and updates the local memory accordingly
    $scope.deleteRecipe = function($index) {
      dataService.deleteID($scope.recipes[$index]._id, function(response) {
        console.log(response);
        dataService.getRecipes(function(response) {
          console.log(response.data);
          $scope.recipes = response.data;
      });
    });
  };
  // instiaties a newRecipe object to display in the view
  var newRecipe = {
    name:"New Recipe",
    description:"New Recipe",
    category:"Other",
    prepTime:0,
    cookTime:0,
    ingredients:[
      {foodItem: "New Item", condition: "New Item", amount: "New Item"},
    ],steps:[
      {description: "This is a new recipe!"}
    ]
  };
  // add recipe function adds the New Recipe Object to the DB and takes the user to the Edit Page to detail it
   $scope.addRecipe = function() {
         dataService.addRecipe(newRecipe, function(response) {
         $location.url('/edit/' + response.data._id);
     },
        function(reason) {
         console.log(reason)
       });
    };
}]);
})();

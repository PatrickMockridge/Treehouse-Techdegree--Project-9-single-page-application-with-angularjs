angular.module("app", ['ngRoute'])
.controller('RecipesController', function($scope, dataService, $http, $location) {
    //get recipes from database on load
   dataService.getRecipes(function(response) {
     console.log(response.data);
     $scope.recipes = response.data;
   });
   //initialise category and id variables
   $scope.category = null;
   $scope.id = null;
   //get recipes from the database based upon categories chosen in the select menu
    $scope.getCategoryOfRecipes = function() {
        console.log($scope.category);
        dataService.getCategoryOfRecipes($scope.category, function(response) {
          console.log(response.data)
          $scope.recipes = response.data
        });
   };
   //get categories
   dataService.getCategory(function(response) {
     console.log(response.data);
     $scope.getCategory = response.data;
   });
    //delete recipe
    $scope.deleteRecipe = function($index) {
      dataService.deleteID($scope.recipes[$index]._id, function(response) {
        console.log(response);
        dataService.getRecipes(function(response) {
          console.log(response.data);
          $scope.recipes = response.data;
      });
    });
  };
  //new recipe JSON object
  var newRecipe = {name:"New Recipe", description:"New Recipe", category:"Other",prepTime:0,cookTime:0,ingredients:[  {foodItem: "New Item", condition: "New Item", amount: "New Item"},],steps:[{description: "This is a new recipe!"}]}
   $scope.addRecipe = function() {
        // add the recipe and then go to the detail screen
         dataService.addRecipe(newRecipe, function(response) {
         $location.url('/edit/' + response.data._id);
     },
        function(reason) {
         console.log(reason)
       });
    };
})
.controller('RecipeDetailController', function($scope, dataService, $http, $location, $routeParams) {
// get the id of the element from the url
$scope.ID = $routeParams.id;
// get the recipe from the database based upon the routeParams
$scope.getID = function() {
  dataService.getID($scope.ID, function(response) {
  console.log(response.data);
  $scope.recipe = response.data;
   });
};
// execute the getID function to get the recipe straight immediately
$scope.getID();
// get the recipe categories to fill the select menu
dataService.getCategory(function(response) {
  console.log(response.data);
    $scope.getCategory = response.data;
      });
// add ingredients object in local memory when button is pushed
$scope.addIngredient = function() {
  $scope.recipe.ingredients.push({
      foodItem: "New Item",
      condition: "New Item",
      amount: "New Item"
    });
};
// delete ingredient
$scope.deleteIngredient = function(index) {
  $scope.recipe.ingredients.splice(index, 1);
}
//create new step in local memory
$scope.newStep = function() {
  $scope.recipe.steps.push({description: "New Step"});
  console.log($scope.recipe.steps);
};

$scope.deleteStep = function(index) {
  $scope.recipe.steps.splice(index, 1);
}
// save the recipe with $http put method
$scope.saveRecipe = function() {
  dataService.putID($scope.recipe._id, $scope.recipe, function(response) {
      console.log(response.data);
      $scope.recipe = response.data;
        }, function(reason) {
          console.log(reason);
          //create an array of error messages for the user from the error reason object,
          //if the messages exist they are passed into $scope.errors array for display to the user
      $scope.errors = [];
      if (reason.data.errors.ingredients != null) {
        $scope.errors.push(reason.data.errors.ingredients[0].userMessage);
      };
      if (reason.data.errors.steps != null) {
        $scope.errors.push(reason.data.errors.steps[0].userMessage );
      }
      if (reason.data.errors.name != null) {
        $scope.errors.push(reason.data.errors.name[0].userMessage );
      }
      console.log($scope.errors);
      });
  };
  //ng-click function for the cancel button
  $scope.goBack = function() {
      $location.url('/#')
  };
    // get all the possible food items for the selector box
   dataService.getFoodItems(function(response) {
     console.log(response.data);
     $scope.foodItems = response.data;
   });

//mainCtrl close function
})
.service('dataService', function($http) {
    //get all recipes
   this.getAll = function(callback) {
     $http.get('http://localhost:5000/api/recipes')
          .then(callback);
   };
   //get all recipes
  this.getRecipes = function(callback) {
    $http.get('http://localhost:5000/api/recipes')
         .then(callback);
   };
   //get recipes of a specific category
  this.getCategoryOfRecipes = function(category, callback) {
    $http.get('http://localhost:5000/api/recipes?category=' + category)
         .then(callback);
   };
   //get specific recipe based upon ID
  this.getID = function(id, callback) {
    $http.get('http://localhost:5000/api/recipes/' + id)
         .then(callback);
   };
   //push an updated existing recipe from the client to the database
  this.putID = function(id, data, callback, failure) {
   $http.put('http://localhost:5000/api/recipes/' + id, data)
        .then(callback, failure)
   };
   //create a new recipe in the database
   this.addRecipe = function(recipe, callbackSuccess, callbackFailure) {
     $http.post('http://localhost:5000/api/recipes', recipe)
          .then(callbackSuccess, callbackFailure);
   };
   //delete recipe from the database
   this.deleteID = function(id, callbackSuccess, callbackFailure) {
     $http.delete('http://localhost:5000/api/recipes/' + id)
          .then(callbackSuccess, callbackFailure)
   };
   // get all the recipe categories
    this.getCategory = function(callback) {
      $http.get('http://localhost:5000/api/categories')
           .then(callback);
   };
   // get all fooditems 
   this.getFoodItems = function(callback) {
      $http.get('http://localhost:5000/api/fooditems')
           .then(callback);
   };
});

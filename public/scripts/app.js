'use strict'
angular.module("app", ['ngRoute'])
.controller('RecipesController', function($scope, dataService, $location) {

   dataService.getRecipes(function(response) {
     console.log(response.data);
     $scope.recipes = response.data;
   });

   $scope.category = null;
   $scope.id = null;

    $scope.getCategoryOfRecipes = function() {
        console.log($scope.category);
        dataService.getCategoryOfRecipes($scope.category, function(response) {
          console.log(response.data)
          $scope.recipes = response.data
        });
   };

   dataService.getCategory(function(response) {
     console.log(response.data);
     $scope.getCategory = response.data;
   });

    $scope.deleteRecipe = function($index) {
      dataService.deleteID($scope.recipes[$index]._id, function(response) {
        console.log(response);
        dataService.getRecipes(function(response) {
          console.log(response.data);
          $scope.recipes = response.data;
      });
    });
  };

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
   $scope.addRecipe = function() {
         dataService.addRecipe(newRecipe, function(response) {
         $location.url('/edit/' + response.data._id);
     },
        function(reason) {
         console.log(reason)
       });
    };
})
.controller('RecipeDetailController', function($scope, dataService, $location, $routeParams) {

  $scope.ID = $routeParams.id;

  $scope.getID = function() {
    dataService.getID($scope.ID, function(response) {
      console.log(response.data);
      $scope.recipe = response.data;
    });
  };
  $scope.getID();

  dataService.getCategory(function(response) {
    console.log(response.data);
      $scope.getCategory = response.data;
        });

  $scope.addIngredient = function() {
    $scope.recipe.ingredients.push({
      foodItem: "New Item",
      condition: "New Item",
      amount: "New Item"
    });
  };

  $scope.deleteIngredient = function(index) {
    $scope.recipe.ingredients.splice(index, 1);
  }

$scope.newStep = function() {
  $scope.recipe.steps.push({description: "New Step"});
  console.log($scope.recipe.steps);
};

  $scope.deleteStep = function(index) {
    $scope.recipe.steps.splice(index, 1);
  }

  $scope.saveRecipe = function() {
    dataService.putID($scope.recipe._id, $scope.recipe, function(response) {
        console.log(response.data);
        $scope.recipe = response.data;
          }, function(reason) {
            console.log(reason);
            $scope.errors = [];
            if (reason.data.errors.ingredients != null) {
              for (var i = 0; i < reason.data.errors.ingredients.length, i++) {
                $scope.errors.push(reason.data.errors.ingredients[i].userMessage);
              };
            };
            if (reason.data.errors.steps != null) {
              for (var i = 0; i < reason.data.errors.steps.length, i++) {
                $scope.errors.push(reason.data.errors.steps[i].userMessage);
              };
            };
            if (reason.data.errors.name != null) {
              for (var i = 0; i < reason.data.errors.name.length, i++) {
                $scope.errors.push(reason.data.errors.name[i].userMessage);
              };
            };
            console.log($scope.errors);
          });
        };

        $scope.goBack = function() {
          $location.url('/#')
        };

        dataService.getFoodItems(function(response) {
          console.log(response.data);
          $scope.foodItems = response.data;
        });

//mainCtrl close function
})
.service('dataService', function($http) {

   this.getAll = function(callback) {
     $http.get('http://localhost:5000/api/recipes')
          .then(callback);
   };

  this.getRecipes = function(callback) {
    $http.get('http://localhost:5000/api/recipes')
         .then(callback);
   };

  this.getCategoryOfRecipes = function(category, callback) {
    $http.get('http://localhost:5000/api/recipes?category=' + category)
         .then(callback);
   };

  this.getID = function(id, callback) {
    $http.get('http://localhost:5000/api/recipes/' + id)
         .then(callback);
   };

  this.putID = function(id, data, callback, failure) {
   $http.put('http://localhost:5000/api/recipes/' + id, data)
        .then(callback, failure)
   };

   this.addRecipe = function(recipe, callbackSuccess, callbackFailure) {
     $http.post('http://localhost:5000/api/recipes', recipe)
          .then(callbackSuccess, callbackFailure);
   };

   this.deleteID = function(id, callbackSuccess, callbackFailure) {
     $http.delete('http://localhost:5000/api/recipes/' + id)
          .then(callbackSuccess, callbackFailure)
   };

    this.getCategory = function(callback) {
      $http.get('http://localhost:5000/api/categories')
           .then(callback);
   };
   this.getFoodItems = function(callback) {
      $http.get('http://localhost:5000/api/fooditems')
           .then(callback);
   };
});

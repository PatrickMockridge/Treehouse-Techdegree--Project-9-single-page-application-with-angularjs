// REVIEW I would wrap all of this code in an immediately invoked function expression

// REVIEW This is a nitpick, but I would suggest that you either use single or double quotes
// for your string literals and stick with that choice (and not switch back and forth).
angular.module("app", ['ngRoute'])
// REVIEW I don't see that the "$http" service is used in this controller. If it's not, 
// then I'd remove it from the list of dependencies.
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
   // REVIEW I would rename this function to `getCategories` to make it clearer that its retrieving 
   // a list of categories and not just a single category.
   dataService.getCategory(function(response) {
     console.log(response.data);
     // REVIEW Why are you assigning the `response.data` over the top of the `getCategory` function?
     // Shouldn't the result go into its own $scope property?
     $scope.getCategory = response.data;
   });
    //delete recipe
    $scope.deleteRecipe = function($index) {
      dataService.deleteID($scope.recipes[$index]._id, function(response) {
        console.log(response);
        // REVIEW Instead of repeating the code to get the list of recipes, how about putting
        // this code into a function and calling it when the controller is loading and here?
        dataService.getRecipes(function(response) {
          console.log(response.data);
          $scope.recipes = response.data;
      });
    });
  };

  //new recipe JSON object
  // REVIEW I would format this code like this. Having it all on one line makes it much more difficult
  // to understand at a glance what the object shape looks like.
  var newRecipe = {
    name: "New Recipe", 
    description: "New Recipe", 
    category: "Other",
    prepTime: 0,
    cookTime: 0,
    ingredients: [
      {
        foodItem: "New Item", 
        condition: "New Item", 
        amount: "New Item"
      },
    ],
    steps: [
      {
        description: "This is a new recipe!"
      }
    ]
  };

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
// REVIEW I would remove "$http" if it's not used.
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
// REVIEW I would rename this function to `getCategories` to make it clearer that its retrieving 
// a list of categories and not just a single category.
dataService.getCategory(function(response) {
  console.log(response.data);
     // REVIEW Why are you assigning the `response.data` over the top of the `getCategory` function?
     // Shouldn't the result go into its own $scope property?
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
      // REVIEW What if there was an error on more than one ingredient?
      if (reason.data.errors.ingredients != null) {
        $scope.errors.push(reason.data.errors.ingredients[0].userMessage);
      };
      // REVIEW What if there was an error on more than one step?
      if (reason.data.errors.steps != null) {
        $scope.errors.push(reason.data.errors.steps[0].userMessage );
      }
      // REVIEW Can you think of a way to map the API errors to your `$scope.errors` array
      // without hard coding the `errors` property names?
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
    // REVIEW Is this function in use?
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
   // REVIEW This is a nitpick, but I would make my callback parameter names 
   // consistent across your data service functions.
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

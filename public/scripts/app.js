angular.module("app", ['ngRoute'])
.controller('RecipesController', function($scope, dataService, $http, $location) {

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

  var newRecipe = {name:"New Recipe", description:"New Recipe", category:"Other",prepTime:0,cookTime:0,ingredients:[  {foodItem: "New Item", condition: "New Item", amount: "New Item"},],steps:[{description: "This is a new recipe!"}]}
   $scope.addRecipe = function() {
         dataService.addRecipe(newRecipe, function(response) {
         $location.url('/edit/' + response.data._id);
     },
        function(reason) {
         console.log(reason)
       }
     );

    };

  //  $scope.clickRecipe = function($index) {
  //      console.log($scope.recipes[$index]._id);
  //      $http.get('http://localhost:5000/api/recipes/' + $scope.recipes[$index]._id)
  //      .then(function(response) {
  //      $scope.recipe = $scope.recipes[$index];
  //      console.log($scope.recipe)
  //      $location.url('/edit/' + $scope.recipes[$index]._id)
  //   });
  // };
})
.controller('RecipeDetailController', function($scope, dataService, $http, $location, $routeParams) {

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

      // $scope.putThis = function() {
      //   dataService.addRecipe(newRecipe, function(response) {
      //       $scope.page = response.data._id;
      //    },
      //      function(reason) {
      //        console.log(reason)
      //      }
      //    );
      //    $location.url('/edit/' + $scope.page)
      //   };

  // $scope.newRecipe = {"name":"New Recipe","description":"New Recipe","category":"","prepTime":0,"cookTime":0,"ingredients":[],"steps":[]}
  //
    $scope.saveRecipe = function() {
          dataService.putID($scope.recipe, function(response) {
          console.log(response.data);
          $scope.recipe = response.data;
        }, function(reason) {
          console.log(reason);
        }
      );
     };

  // dataService.putID(function(response) {
  //   console.log(response.data);
  //   $scope.putID = response.data;
  // });
  //
  //  dataService.postID(function(response) {
  //    console.log(response.data);
  //    $scope.recipes = response.data;
  //  });
  //
  $scope.goBack = function() {
      $location.url('/#')
  };

  //
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
  this.putID = function(id, callback, failure) {
   $http.put('http://localhost:5000/api/recipes/', id)
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
      $http.get('http://localhost:5000/api/fooditems') // something that gets food items
      .then(callback);
   };
});
// .config(function($sceProvider) {
//    $sceProvider.enabled(false);
//  });

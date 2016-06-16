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

  //  $scope.addRecipe = function() {
  //    dataService.addRecipe(function(response) {
  //      console.log(response.data);
  //      $scope.recipes = response.data;
  //    });
  //  };

  var newRecipe = {name:"New Recipe",description:"New Recipe",category:"Other",prepTime:0,cookTime:0,ingredients:[  {foodItem: "New Item", condition: "New Item", amount: "New Item"},],steps:[{description: "This is a new recipe!"}]}
  //var data = $.param(newRecipe);
  //var config = {
      //headers : {
                //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            //}
      //};
   $scope.addRecipe = function() {
         dataService.addRecipe(newRecipe, function(response) {
         var page = response.data._id;
         $location.url('/edit/' + response.data._id)
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

if ($scope.ID != 123) {
  $scope.getID = function() {
  dataService.getID( $scope.ID, function(response) {
  console.log(response.data);
  $scope.recipe = response.data;
   });
 };
 $scope.getID();
 }

 dataService.getCategory(function(response) {
    console.log(response.data);
      $scope.getCategory = response.data;
      });

  // $scope.newRecipe = {"name":"New Recipe","description":"New Recipe","category":"","prepTime":0,"cookTime":0,"ingredients":[],"steps":[]}
  //
  //  $scope.addRecipe = function() {
  //        dataService.addRecipe($scope.newRecipe, function(response) {
  //        console.log(response.data);
  //        $scope.recipes = response.data;
  //      });
  //   };

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
  // dataService.deleteID(function(response) {
  //   console.log(response.data);
  //   $scope.deleteID = response.data;
  // });
  //

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
  // this.putID = function(callback) {
  // $http.put('http://localhost:5000/api/recipes/{id}')
  //   .then(callback)
  // }
   this.addRecipe = function(recipe, callbackSuccess, callbackFailure) {
     $http.post('http://localhost:5000/api/recipes', recipe)
    .then(callbackSuccess, callbackFailure);
  };
  // this.deleteID = function(callback, id) {
  //   $http.delete('http://localhost:5000/api/recipes/{id}')
  //   .then(callback)
  // }
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

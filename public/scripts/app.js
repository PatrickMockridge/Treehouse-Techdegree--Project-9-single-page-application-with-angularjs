angular.module("app", ["ngRoute", "ngResource"])
.controller('RecipesController', function($scope, dataService) {

  $scope.addRecipe = function() {
    var newRecipe = {description: "This is a new recipe!"};
    $scope.recipes.push(newRecipe);
  }

   dataService.getRecipes(function(response) {
     console.log(response.data);
     $scope.recipes = response.data;
   });
  //
    dataService.getCategoryOfRecipes(function(response) {
      console.log(response.data);
      $scope.recipes = response.data;
    });

    dataService.getID(function(response) {
     console.log(response.data);
     $scope.getID = response.data;
   });

  // dataService.putID(function(response) {
  //   console.log(response.data);
  //   $scope.putID = response.data;
  // });
  //
   dataService.postID(function(response) {
     console.log(response.data);
     $scope.recipes = response.data;
   });
  //
  // dataService.deleteID(function(response) {
  //   console.log(response.data);
  //   $scope.deleteID = response.data;
  // });
  //
    dataService.getCategory(function(response) {
      console.log(response.data);
      $scope.getCategory = response.data;
    });
  //
  // dataService.getFoodItems(function(response) {
  //   console.log(response.data);
  //   $scope.getFoodItems = response.data;
  // });

//mainCtrl close function
})

//need to serialse REST API requests with $.param or something like that

.service('dataService', function($http) {
   this.getRecipes = function(callback) {
     $http.get('http://localhost:5000/api/recipes')
     .then(callback);
     }
     this.getCategoryOfRecipes = function(callback, category) {
      $http.get('http://localhost:5000/api/recipes?category={category}')
      .then(callback);
      }
      this.getID = function(callback) {
      $http.get('http://localhost:5000/api/recipes/')
      .then(callback)
      }
  // this.putID = function(callback) {
  // $http.put('http://localhost:5000/api/recipes/{id}')
  //   .then(callback)
  // }
   this.postID = function(callback) {
     $http.post('http://localhost:5000/api/recipes/')
     .then(callback)
  // }
  // this.deleteID = function(callback, id) {
  //   $http.delete('http://localhost:5000/api/recipes/{id}')
  //   .then(callback)
  // }
    this.getCategory = function(callback) {
      $http.get('http://localhost:5000/api/categories') // something that gets categories
       .then(callback)
   }
  // this.getFoodItems = function(callback) {
  //   $http.get('http://localhost:5000/api/recipes') // something that gets food items
  //    .then(callback)
  // }
});
// .config(function($sceProvider) {
//    $sceProvider.enabled(false);
//  });

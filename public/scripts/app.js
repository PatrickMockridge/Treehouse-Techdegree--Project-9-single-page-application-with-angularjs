angular.module("app", ['ngRoute'])
.controller('RecipesController', function($scope, dataService, $http, $location) {

   dataService.getRecipes(function(response) {
     console.log(response.data);
     $scope.recipes = response.data;
   });

   $scope.category = null;
   $scope.id = null;

    $scope.getCategoryOfRecipes = function() {
        console.log(id);
        $http.get('http://localhost:5000/api/recipes?category=' + $scope.category)
        .then(function(response){
        $scope.recipes = response.data
     });
   };

   $scope.clickRecipe = function($index) {
       console.log($scope.recipes[$index]._id);
       $http.get('http://localhost:5000/api/recipes/' + $scope.recipes[$index]._id)
       .then(function(response) {
       $scope.recipe = $scope.recipes[$index];
       console.log($scope.recipe)
       $location.url('/edit/' + $scope.recipes[$index]._id)
    });
  };

    dataService.getID(function(response) {
     console.log(response.data);
     $scope.getID = response.data;
   });

   //
   // $scope.addRecipe = function() {
   //   var newRecipe = {description: "This is a new recipe!"};
   //   $scope.recipes.push(newRecipe);
   // }

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
.service('dataService', function($http) {
   this.getAll = function(callback) {
     $http.get('http://localhost:5000/api/recipes')
     .then(callback);
     }

     this.getRecipes = function(callback) {
        $http.get('http://localhost:5000/api/recipes')
        .then(callback)
     }

    this.getCategoryOfRecipes = function(category, callback) {
        $http.get('http://localhost:5000/api/recipes?=' + category)
        .then(callback)
    }

    this.getID = function(callback) {
      $http.get('http://localhost:5000/api/recipes/')
      .then(callback)
    }
  // this.putID = function(callback) {
  // $http.put('http://localhost:5000/api/recipes/{id}')
  //   .then(callback)
  // }
  //  this.postID = function(callback) {
  //    $http.post('http://localhost:5000/api/recipes/', {})
  //    .then(callback)
   //}
  // this.deleteID = function(callback, id) {
  //   $http.delete('http://localhost:5000/api/recipes/{id}')
  //   .then(callback)
  // }
    this.getCategory = function(callback) {
      $http.get('http://localhost:5000/api/categories')
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

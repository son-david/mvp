angular.module('shortly.profile', [])

.controller('ProfileController', ['$scope','$location', 'User', function ($scope, $location, User) {
  $scope.user = {};

  $scope.getUser = function(){
    User.getUser().then(function(user){
      $scope.user.username = user.data.username;
      $scope.user.password = user.data.password;
    })
  };

  $scope.getUser();
}]);

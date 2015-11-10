angular.module('shortly.profile', [])

.controller('ProfileController', ['$scope','$location', 'User', 'Auth', function ($scope, $location, User, Auth) {
  $scope.user = {};

  $scope.getUser = function(){
    User.getUser().then(function(user){
      $scope.user.username = user.data.username;
      $scope.user.fullname = user.data.fullname;
      $scope.user.address = user.data.address;
      $scope.user.city = user.data.city;
      $scope.user.state = user.data.state;
      $scope.user.zip = user.data.zip;
      $scope.user.phone = user.data.phone;
      $scope.user.dob = user.data.dob;
      $scope.user.email = user.data.email;
    })
  };

  $scope.getUser();

  $scope.logout = function() {
    Auth.signout();
  }
}]);

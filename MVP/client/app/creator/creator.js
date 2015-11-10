angular.module('voter.creator', [])

.controller('CreatorController', ['$scope', '$location', 'Ballots', 'Auth', function ($scope, $location, Ballots, Auth) {

  $scope.ballot = {};
  $scope.addBallot = function(){
    Ballots.addBallot($scope.ballot)
      .then(function() {
        $location.path('/ballots');
      })
      .catch(function(error){
        console.log(error);
      });
  };

  $scope.logout = function() {
    Auth.signout();
  }
}]);

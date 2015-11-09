angular.module('shortly.shorten', [])

.controller('ShortenController', ['$scope', '$location', 'Links', 'Ballots', function ($scope, $location, Links, Ballots) {
  // Your code here
  $scope.link = {};
  $scope.ballot = {};
  $scope.addLink = function () {
    Links.addLink();
  };
  $scope.addBallot = function(){
    Ballots.addBallot();
  };
}]);

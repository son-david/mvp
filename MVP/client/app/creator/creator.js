angular.module('shortly.creator', [])

.controller('CreatorController', ['$scope', '$location', 'Ballots', function ($scope, $location, Ballots) {

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
}]);

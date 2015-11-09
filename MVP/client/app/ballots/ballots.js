angular.module('shortly.ballots', [])

.controller('BallotsController', ['$scope','$location', 'Links', 'Ballots', function ($scope, $location, Links, Ballots) {
  $scope.data = {ballots : [{
    visits: 1,
    title: 'yes',
    url: 'asdfd'
    }]
  };
  $scope.test = function(){
    console.log('tes');
  };

  $scope.getBallots = function () {
    Ballots.getBallots()
      .then(function (ballots) {
        $scope.data.ballots = ballots;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.addBallot = function(){
    console.log('ssssss');
    Ballots.addBallot($scope.data)
      .then(function() {
        $location.path('/');
      })
      .catch(function(error){
        console.log(error);
      })
  }

  $scope.getBallots();

}]);
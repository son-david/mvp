angular.module('shortly.ballots', [])

.controller('BallotsController', ['$scope','$location', 'Ballots', 'Auth', function ($scope, $location, Ballots, Auth) {
  $scope.data = {};

  $scope.getBallots = function () {
    Ballots.getBallots()
      .then(function (res) {
        $scope.data.ballots = res.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.getBallots();

  $scope.vote = function(val){ //{opt:#, ballot._id}
    console.log(val);
    Ballots.vote(val);
    $scope.getBallots();
  };

  $scope.logout = function() {
    Auth.signout();
  }

}]);
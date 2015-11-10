angular.module('shortly.ballots', [])

.controller('BallotsController', ['$scope','$location', 'Ballots', 'Auth', 'User', function ($scope, $location, Ballots, Auth, User) {
  $scope.data = {};
  var votes = [];

  $scope.getBallots = function () {
    Ballots.getBallots()
      .then(function (res) {
        $scope.data.ballots = res.data;
      })
      .catch(function (error) {
        console.error(error);
      });
    User.getUser()
    .then(function(res){
      if (res.data.votes){
        votes = res.data.votes;
      }
    });
  };

  $scope.getBallots();

  $scope.vote = function(val){ //{opt:#, ballot._id}
    Ballots.vote(val);
    User.addVote(val);
    $scope.getBallots();
  };

  $scope.logout = function() {
    Auth.signout();
  };

  $scope.test = function(ballot){
    if (votes.length > 0) {
      console.log(votes);
      for (var i = 0; i < votes.length; i++){
        if (ballot._id === votes[i].id) {
          return false;
        }
      }
    }
    return true; 
  };
}]);
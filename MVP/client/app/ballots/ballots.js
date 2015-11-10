angular.module('voter.ballots', [])

.controller('BallotsController', ['$scope','$location', 'Ballots', 'Auth', 'User', function ($scope, $location, Ballots, Auth, User) {
  $scope.data = {};
  var votes = [];

  $scope.getBallots = function () {
    Ballots.getBallots()
      .then(function (res) {
        var reverse = res.data.slice().reverse();
        $scope.data.ballots = reverse;
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

  $scope.vote = function(val){
    Ballots.vote(val).then(function(){
      User.addVote(val).then(function(){
        $scope.getBallots();
      });
    });
  };

  $scope.logout = function() {
    Auth.signout();
  };

  $scope.test = function(ballot){
    if (votes.length > 0) {
      for (var i = 0; i < votes.length; i++){
        if (ballot._id === votes[i].id) {
          return false;
        }
      }
    }
    return true; 
  };
}]);
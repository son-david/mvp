angular.module('shortly.services', [])

.factory('User', function($http){
  var getUser = function(){
    return $http({
      method: 'GET',
      url: '/api/users'
    });
  };
  var addVote = function(val){
    return $http({
      method: 'POST',
      url: '/api/users',
      data: val
    });
  };
  return {
    getUser : getUser,
    addVote : addVote
  }
})
.factory('Ballots', function($http){
  var getBallots = function(){
    return $http({
      method: 'GET',
      url: '/api/ballots'
    });
  };
  var addBallot = function (val) {
    return $http({
      method: 'POST',
      url: '/api/ballots',
      data: val
    });
  };
  var vote = function (val) {
    return $http({
      method: 'POST',
      url: 'api/ballots/vote',
      data: val
    })
  }
  return {
    getBallots : getBallots,
    addBallot : addBallot,
    vote: vote
  }
})
.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };
  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };
  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };
  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});

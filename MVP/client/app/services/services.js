angular.module('voter.services', [])

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
    return !!$window.localStorage.getItem('com.voter');
  };
  var signout = function () {
    $window.localStorage.removeItem('com.voter');
    $location.path('/signin');
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
.factory('d3Service', ['$document', '$q', '$rootScope',
  function($document, $q, $rootScope) {
    var d = $q.defer();
    function onScriptLoad() {
      // Load client in the browser
      $rootScope.$apply(function() { d.resolve(window.d3); });
    }
    // Create a script tag with d3 as the source
    // and call our onScriptLoad callback when it
    // has been loaded
    var scriptTag = $document[0].createElement('script');
    scriptTag.type = 'text/javascript'; 
    scriptTag.async = true;
    scriptTag.src = 'http://d3js.org/d3.v3.min.js';
    scriptTag.onreadystatechange = function () {
      if (this.readyState == 'complete') onScriptLoad();
    }
    scriptTag.onload = onScriptLoad;

    var s = $document[0].getElementsByTagName('body')[0];
    s.appendChild(scriptTag);

    return {
      d3: function() { return d.promise; }
    };
}]);

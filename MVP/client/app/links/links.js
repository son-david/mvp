angular.module('shortly.links', [])

.controller('LinksController', ['$scope','$location', 'Links', function ($scope, $location, Links) {
  $scope.data = {};

  $scope.getLinks = function () {
    Links.getLinks().then(function (link) {
      $scope.data.links = link.data;
    });
  };
  $scope.getLinks();
}]);

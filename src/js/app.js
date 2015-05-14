(function() {
  'use strict';

  var angular = require('angular');

  angular.module('zeroApp', [])
  .controller('MainCtrl', ['$scope', function($scope) {
      $scope.msg = "Hello Angular!";
      console.log($scope.msg);
  }]);

})();

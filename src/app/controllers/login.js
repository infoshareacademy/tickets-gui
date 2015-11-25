'use strict';

/**
 * @ngdoc function
 * @name tickets.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of tickets
 */
angular.module('tickets')
  .controller('LoginCtrl', function($scope, $location) {

    $scope.submit = function() {

      $location.path('/dashboard');

      return false;
    }

  });

'use strict';

/**
 * @ngdoc function
 * @name tickets.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of tickets
 */
angular.module('tickets')
  .controller('LoginCtrl', function($scope, $location, $http, $rootScope) {

      $scope.fbUser = $location.search();
      $rootScope.fbUser = $scope.fbUser.id;


      $scope.verify = function() {
        if ( $rootScope.fbUser ) {
          $location.path('/dashboard');
          return false;
        }

      };
      $scope.verify();


    $scope.submit = function() {

      $location.path('/dashboard');

      return false;
    };


      $scope.facebookLogin = function () {
        $http.get('http://localhost:3000/login/facebook')
            .then(function (response) {
              console.log(response);
            });
      }


  });

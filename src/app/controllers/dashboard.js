'use strict';

/**
 * @ngdoc function
 * @name tickets.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of tickets
 */
angular.module('tickets')
  .controller('DashboardCtrl', function($scope, $state, $http) {

    $scope.$state = $state;
    $scope.sync = 'Database synchronization started. \nPlease be patient :)';

      $scope.synchronizeDb = function() {
        $http.get('http://test.tickets-processor.infoshareaca.nazwa.pl/app_dev.php/update')
            .success(function(data){
            })
            .error(function(err){
              $scope.sync = 'Database synchronization failed. \nWe are sorry.';
            })
      }

  });

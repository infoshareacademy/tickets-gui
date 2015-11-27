'use strict';

/**
 * @ngdoc function
 * @name tickets.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of tickets
 */
angular.module('tickets')
  .controller('DashboardCtrl', function($scope, $state, $http, $rootScope, $location) {

        $scope.$state = $state;

        $scope.verify = function() {
            if ( !$rootScope.fbUser ) {
                $location.path('/login');
                return false;
            }

        };
        $scope.verify();

        $scope.synchronizeDb = function() {
        $scope.modalTxt = '<h4>Database synchronization started. </h4><p>Please be patient :)</p>';

        $http.get('http://test.tickets-processor.infoshareaca.nazwa.pl/update')
            .success(function(data){
                $scope.modalTxt = '<h4>Database synchronization started. </h4><p>Please be patient :)</p>';
            })
            .error(function(err){
                $scope.modalTxt = '<h4>Database synchronization failed. </h4><p>We are sorry.</p>';
            })
        };

        $scope.logout = function() {
            $http.get('http://localhost:3000/signout')
                .success(function(data) {

                });
        };
        $rootScope.$on('openEventModal', function(event, data){
            console.log(data);
            $scope.day = new Date(data.date);
            $scope.modalTxt  = '<h4><a href="' + data.eventUrl + '">' + data.title + '</a></h4>'
                                + '<p>' + $scope.day  + '</p>';
        });



  });

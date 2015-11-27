/**
 * Created by paoolskoolsky on 27.11.15.
 */
angular.module('tickets')
    .controller('SubscribeCtrl', function($scope, $state, $http) {

        $scope.subscribeSuccess = false;

   $scope.submit = function (email, name) {


       $http.post('http://', {
           'email' : email,
           'name' : name
       })
           .then(function () {
               $scope.subscribeSuccess = true;
           })
   }
    });
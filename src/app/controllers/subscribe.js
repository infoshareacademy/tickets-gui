/**
 * Created by paoolskoolsky on 27.11.15.
 */
angular.module('tickets')
    .controller('SubscribeCtrl', function ($scope, $state, $http) {

        $scope.subscribeMessage = '';

        $scope.submit = function (email, name) {


            $http.post('http://localhost:3000/subscribers', {
                'email': email,
                'name': name
            })
                .success(function () {
                    $scope.subscribeMessage = 'Success - You add your email to newsletter list';
                })
                .error(function () {
                    $scope.subscribeMessage = 'Fail - This email is already in base...';
                })
        };

        $scope.delete = function (email) {


            $http.put('http://localhost:3000/subscribers', {
                'email': email
            })
                .success(function () {
                    $scope.subscribeMessage = 'Success - You remove your email to newsletter list';
                })
                .error(function () {
                    $scope.subscribeMessage = 'Fail - Something went wrong...';
                })
        }
    });
/**
 * Created by paoolskoolsky on 17.11.15.
 */
(function () {
    var app = angular.module('tickets', []);

    app.controller('TicketList', function ($scope, $http) {

        var url = 'http://localhost:8080/tickets-filter/app_dev.php/';

        var getTickets = function () {
            $http.get(url)
                .then(function (response) {
                    console.log(response);
                    $scope.ticketList = response.data;
                })
        };
        getTickets();

    });

})();
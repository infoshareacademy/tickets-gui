/**
 * Created by paoolskoolsky on 17.11.15.
 */
(function () {
    var app = angular.module('tickets', []);

    app.controller('TicketList', function ($scope, $http) {
        var getTickets = function () {
            //
            var tickietClear = [];
            $http.get('null/data.json')
            .then(function (response) {
                angular.forEach(response.data, function(ticket) {
                    ticket.description = cleanString(ticket.description);
                    tickietClear.push(ticket);
                });
                $scope.ticketList = tickietClear;
            })
        };

        var url = 'http://localhost:8080/tickets-filter/app_dev.php/';


        var cleanString = function (string) {
            var temp = string;
            while (1) {
                if(temp.indexOf('<') >= 0 && temp.indexOf('>') >= 0 && temp.indexOf('>')>temp.indexOf('<')) {
                    temp = temp.replace(temp.substring(temp.indexOf('<'),temp.indexOf('>')+1), '');
                } else {
                    break;
                }
            }
            return temp;
        };

        $http.get('null/data.json').then(function (response) {
            angular.forEach(response.data, function(ticket) {
                ticket.description = cleanString(ticket.description);
                $scope.ticketList = ticket;
            });
        })

        getTickets();


    });

})();
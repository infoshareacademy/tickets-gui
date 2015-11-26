/**
 * Created by katban on 23.11.15.
 */
angular.module("tickets")
    .directive('ticketTable', function() {
        return {
            restrict: 'E',
            templateUrl: '_directives/ticket-table.html',
            transclude: true,
            scope: {},
            controller: function ($scope, $http) {

                var loader = function () {
                    //$http.get('http://localhost:8080/tickets-filter/app_dev.php/')
                    //$http.get('http://test.tickets-processor.infoshareaca.nazwa.pl/import')
                    $http.get('null/data.json')
                        .then(function (response) {
                            var ticketClear = [];
                            angular.forEach(response.data, function(ticket) {
                                ticket.description = cleanString(ticket.description);
                                ticketClear.push(ticket);
                            });
                            $scope.ticketsList = ticketClear;
                            $scope.isLoaded = true;

                        });
                };

                $scope.reorder = function (field, typeList) {
                    if(typeList ==='music') {
                        $scope.desc = $scope.sortingField === field ? !$scope.desc : false;
                        $scope.sortingField = field;
                    } else {
                        $scope.sportDesc = $scope.sortingField === field ? !$scope.sportDesc : false;
                        $scope.sortingSportField = field;
                    }
                };

                $scope.init = function () {
                    $scope.isLoaded = false;
                    $scope.type = 'music';
                    loader();
                };

                var cleanString = function (string) {
                    var temp = string;
                    while (1) {
                        // remove comment's tags
                        if(temp.indexOf('<!--') >= 0 && temp.indexOf('-->') >= 0 && temp.indexOf('-->')>temp.indexOf('<!--')) {
                            temp = temp.replace(temp.substring(temp.indexOf('<!--'),temp.indexOf('-->')+3), '');
                        }
                        // remove all html tags
                        else if (temp.indexOf('<') >= 0 && temp.indexOf('>') >= 0 && temp.indexOf('>')>temp.indexOf('<')) {
                            temp = temp.replace(temp.substring(temp.indexOf('<'),temp.indexOf('>')+1), '');
                        }
                        // remove declaration of css
                        else if (temp.indexOf('#') >= 0 && temp.indexOf('}') >= 0 && temp.indexOf('}')>temp.indexOf('#')) {
                            temp = temp.replace(temp.substring(temp.indexOf('#'),temp.indexOf('}')+1), '');
                        }
                        else if (temp.indexOf('{') >= 0 && temp.indexOf('}') >= 0 && temp.indexOf('}')>temp.indexOf('{')) {
                            temp = temp.replace(temp.substring(temp.indexOf('{'),temp.indexOf('}')+1), '');
                        }
                        //remove character's code
                        else if ((temp.indexOf('&') >= 0 && temp.indexOf(';') >= 0 && temp.indexOf(';')>temp.indexOf('&'))) {
                            temp = temp.replace(temp.substring(temp.indexOf('&'),temp.indexOf(';')+1), ' ');
                        }
                        //escape from while
                        else  {
                            break;
                        }
                    }
                    return temp.trim();
                };

                $scope.tickets = [
                    {title: '', auctionUrl: '', description: '', price: '', type: ''},
                    {title: '', auctionUrl: '', description: '', price: '', type: ''}
                ];
                $http.get('http://test.tickets-processor.infoshareaca.nazwa.pl/?format=pretty')
                    .then(function (response) {
                        $scope.tickets = response.data;
                    });
                $scope.calendarOptions = {
                    defaultDate: "2016-10-10",
                    minDate: new Date(),
                    maxDate: new Date([2020, 12, 31]),
                    dayNamesLength: 1, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
                    eventClick: $scope.eventClick,
                    dateClick: $scope.dateClick
                };
                $scope.events = [
                    {title: 'NY', date: new Date([2015, 12, 31])},
                    {title: 'ID', date: new Date([2015, 6, 4])}
                ];

                $scope.init();
            }
        }
    });
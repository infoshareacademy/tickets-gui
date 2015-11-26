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
            controller: function ($scope, $state, $http) {

                var developDbUrl = 'http://localhost:8080/tickets-filter/app_dev.php/';
                var mockedDb = 'null/data.json';
                var testDbUrl = 'http://test.tickets-processor.infoshareaca.nazwa.pl/import';

                var localBackend = 'http://localhost:3000/fav-tickets';

                $scope.$state = $state;

                var loader = function () {
                    if ($state.includes('overview')) {
                    $http.get(mockedDb)
                        .then(function (response) {
                            getTickets(response);
                        });
                    } else if ($state.includes('favorites')) {
                            $http.get(localBackend)
                                .then(function(response) {
                                    getTickets(response);
                                })
                    }
                };

                var getTickets = function (response) {
                    var ticketClear = [];
                    angular.forEach(response.data, function(ticket) {
                        ticket.description = cleanString(ticket.description);
                        ticketClear.push(ticket);
                    });
                    $scope.ticketsList = ticketClear;
                    $scope.isLoaded = true;
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

                $scope.init();

                $scope.addToFavorites = function(favTicket) {
                    console.log('added to favorites');
                    var newFavTicket = angular.copy(favTicket);
                    $http.post(localBackend, newFavTicket)
                        .then(function (response) {
                        })
                };

                $scope.removeFromFavorites = function(favTicket) {
                    console.log('removed from favorites');
                    $http.delete(localBackend + '/' + favTicket._id)
                        .then(function (response) {
                            loader();
                        })
                };
            }
        }
    });
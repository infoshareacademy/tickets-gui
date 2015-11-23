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
                    $http.get('http://localhost:8080/tickets-filter/app_dev.php/')
                        .then(function (response) {
                            var tickietClear = [];
                            angular.forEach(response.data, function(ticket) {
                                ticket.description = cleanString(ticket.description);
                                tickietClear.push(ticket);
                            });
                            $scope.ticketsList = tickietClear;
                            $scope.isLoaded = true;

                        });
                };

                $scope.reorder = function (field) {
                    $scope.desc = $scope.sortingField === field ? !$scope.desc : false;
                    $scope.sortingField = field;
                };

                $scope.init = function () {
                    $scope.isLoaded = false;
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
            }
        }
    });
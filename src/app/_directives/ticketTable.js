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

                $http.get('../app/null/data.json')
                    .then(function (response) {
                        var tickietClear = [];
                        angular.forEach(response.data, function(ticket) {
                            ticket.description = cleanString(ticket.description);
                            tickietClear.push(ticket);
                        });
                        $scope.ticketsList = tickietClear;

                    });

                $scope.reorder = function (field) {
                    $scope.desc = $scope.sortingField === field ? !$scope.desc : false;
                    $scope.sortingField = field;
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

            }
        }
    });
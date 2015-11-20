/**
 * Created by paoolskoolsky on 17.11.15.
 */
(function(){
    var app = angular.module('tickets', []);

    app.controller('TickietsController', function ($scope, $http) {
        $http.get('null/data.json')
            .then(function (response) {
                var tickietClear = [];
                angular.forEach(response.data, function(ticket) {
                    ticket.description = cleanString(ticket.description);
                    tickietClear.push(ticket);
                });
                $scope.tickietsList = tickietClear;

            });

        $scope.reorder = function (field) {
            $scope.desc = $scope.sortingField === field ? !$scope.desc : false;
            $scope.sortingField = field;
        };

        var cleanString = function (string) {
            var temp = string;
            while (1) {
                // remove meta tags
                if (temp.indexOf('<!DOCTYPE') >= 0 && temp.indexOf('>') >= 0 && temp.indexOf('>')>temp.indexOf('<!DOCTYPE')) {
                    temp = temp.replace(temp.substring(temp.indexOf('<!DOCTYPE'),temp.indexOf('>')+1), '');
                }
                // remove comment's tag
                else if(temp.indexOf('<!--') >= 0 && temp.indexOf('-->') >= 0 && temp.indexOf('-->')>temp.indexOf('<!--')) {
                    temp = temp.replace(temp.substring(temp.indexOf('<!--'),temp.indexOf('-->')+3), '');
                }
                // remove all html tags
                else if (temp.indexOf('<') >= 0 && temp.indexOf('>') >= 0 && temp.indexOf('>')>temp.indexOf('<')) {
                    temp = temp.replace(temp.substring(temp.indexOf('<'),temp.indexOf('>')+1), '');
                }
                // remove declaration of css
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
            return temp;
        };

    })
})();
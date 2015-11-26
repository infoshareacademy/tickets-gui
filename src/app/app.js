/**
 * Created by paoolskoolsky on 17.11.15.
 */
angular
    .module('tickets', [
        'ui.router',
        'snap',
        'ngAnimate',
        '500tech.simple-calendar'
    ])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.when('/dashboard', '/dashboard/overview');
        $urlRouterProvider.otherwise('/login');

        $stateProvider
            .state('base', {
                abstract: true,
                url: '',
                templateUrl: '_views/base.html'
            })
            .state('login', {
                url: '/login',
                parent: 'base',
                templateUrl: '_views/login.html',
                controller: 'LoginCtrl'
            })
            .state('dashboard', {
                url: '/dashboard',
                parent: 'base',
                templateUrl: '_views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .state('overview', {
                url: '/overview',
                parent: 'dashboard',
                templateUrl: '_views/dashboard/overview.html'
            })
            .state('favorites', {
                url: '/favorites',
                parent: 'dashboard',
                templateUrl: '_views/dashboard/favorites.html'
            });
    }).directive('tooltip', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                $(element).hover(function(){
                    // on mouseenter
                    $(element).tooltip('show');
                }, function(){
                    // on mouseleave
                    $(element).tooltip('hide');
                });
            }
        };
    });
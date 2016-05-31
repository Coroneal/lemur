angular.module('lemurApp').config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/logout', {
            template: '<phone-list></phone-list>'
        }).when('/phones/:phoneId', {
            template: '<phone-detail></phone-detail>'
        }).otherwise('/login');
    }
]);
(function () {
    'use strict';

    // Prepare the 'users' module for subsequent registration of controllers and delegates
    angular.module('lemurApp', ['ngMaterial','spring-security-csrf-token-interceptor'])
        .config(function ($mdThemingProvider) {

            $mdThemingProvider.definePalette('lemurPalette', {
                '50': '#f9fbe7',
                '100': '#f0f4c3',
                '200': '#e6ee9c',
                '300': '#dce775',
                '400': '#d4e157',
                '500': '#cddc39',
                '600': '#c0ca33',
                '700': '#afb42b',
                '800': '#9e9d24',
                '900': '#827717',
                'A100': '#f4ff81',
                'A200': '#eeff41',
                'A400': '#c6ff00',
                'A700': '#aeea00',
                'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                    // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                    '200', '300', '400', 'A100'],
                'contrastLightColors': '900',       // could also specify this if default was 'dark'
                'contrastStrongLightColors': '900'
            });

            $mdThemingProvider.theme('default')
                .primaryPalette('lemurPalette');

        })
        .config(function ($interpolateProvider) {
            $interpolateProvider.startSymbol('[[').endSymbol(']]');
        })
        .config(function ($httpProvider) {
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        })
        .controller('AppCtrl', ['$scope', '$window', '$log', '$mdSidenav', '$http',
            function ($scope, $window, $log, $mdSidenav, $http) {

                $scope.toppings = [
                    {name: 'Angular JS', wanted: true},
                    {name: 'jQuery', wanted: false},
                    {name: 'Angular Material', wanted: true},

                ];

                $scope.toggleFilter = function (sideId) {

                    $mdSidenav(sideId)
                        .toggle()
                        .then(function () {
                            $log.debug("toggle " + sideId + " is done");
                        });

                };
                $scope.closeFilter = function (sideId) {
                    $mdSidenav(sideId).close()
                        .then(function () {
                            $log.debug("close RIGHT is done");
                        });
                };
                $scope.logout = function () {
                    $http.post('/logout', {})
                        .then(function (response) {
                            if (response.status == 200) {
                                window.location.reload();
                            }
                            else {
                                console.log("Logout failed!");
                            }
                        });
                };
            }]);
})();

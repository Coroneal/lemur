(function () {
    'use strict';

    // Prepare the 'users' module for subsequent registration of controllers and delegates
    angular.module('lemurApp',
        [
            'ngMaterial',
            'ngAnimate',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ui.router',
            'sasrio.angular-material-sidenav',
            'spring-security-csrf-token-interceptor'
        ])
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
                .primaryPalette('lemurPalette', {
                    'hue-3': '900' // use shade A100 for the <code>md-hue-3</code> class
                })
                .accentPalette('grey')
                .warnPalette('red')
                .backgroundPalette('grey');

        })
        .config([
            '$mdThemingProvider',
            '$locationProvider',
            '$urlRouterProvider',
            '$stateProvider',
            'ssSideNavSectionsProvider',
            function ($mdThemingProvider,
                      $locationProvider,
                      $urlRouterProvider,
                      $stateProvider,
                      ssSideNavSectionsProvider) {


                $urlRouterProvider.otherwise(function () {
                    return '/';
                });


                $stateProvider.state({
                    name: 'lemur',
                    abstract: true,
                    templateUrl: 'shared/common.html',
                    controller: 'CommonCtrl'
                });

                $stateProvider.state({
                    name: 'lemur.home',
                    url: '/',
                    templateUrl: 'home/home.html',
                    controller: function ($scope) {
                        $scope.title = 'Hello Link 1';
                    }
                });

                $stateProvider.state({
                    name: 'lemur.about',
                    url: '/',
                    templateUrl: 'about/about.html',
                    controller: function ($scope) {
                        $scope.title = 'Hello Link 2';
                    }
                });


                $stateProvider.state({
                    name: 'lemur.home.list',
                    url: '/list',
                    templateUrl: 'home/home-list.html',
                    controller: function ($scope) {
                        $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
                    }
                });

                //$stateProvider.state({
                //    name: 'common.link1',
                //    url: '/link1',
                //    templateUrl: 'lemur.html',
                //    template: '<h1>{{title}}</h1>',
                //    controller: function ($scope) {
                //        $scope.title = 'Hello Link 1';
                //    }
                //});
                //
                //$stateProvider.state({
                //    name: 'common.link2',
                //    url: '/link2',
                //    templateUrl: 'lemur.html',
                //    template: '<h1>{{title}}</h1>',
                //    controller: function ($scope) {
                //        $scope.title = 'Hello Link 2';
                //    }
                //});

                ssSideNavSectionsProvider.initWithSections([{
                    id: 'home',
                    name: 'home',
                    state: 'lemur.home',
                    type: 'link'
                }, {
                    id: 'about',
                    name: 'about',
                    state: 'lemur.about',
                    type: 'link'
                }]);
                ssSideNavSectionsProvider.initWithTheme($mdThemingProvider);
            }
        ])
        .config(function ($httpProvider) {
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        })
        .controller('AppCtrl', ['$scope', '$timeout', '$window', '$log', '$mdSidenav', '$http', 'ssSideNav',
            function ($scope, $timeout, $window, $log, $mdSidenav, $http, ssSideNav) {

                $scope.menu = ssSideNav;

                $timeout(function () {
                    ssSideNav.setVisible('toogle_2', false);
                });

                $timeout(function () {
                    // force selection on child dropdown menu item and select its state too.
                    ssSideNav.forceSelectionWithId('toogle_1_link_2');
                }, 1000 * 3);
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
            }])
        .controller('CommonCtrl', [
            '$scope',
            '$mdSidenav',
            '$timeout',
            '$rootScope',
            '$state',
            'ssSideNav',
            'ssSideNavSharedService',
            'sharedProperties',
            function ($scope,
                      $mdSidenav,
                      $timeout,
                      $rootScope,
                      $state,
                      ssSideNav,
                      ssSideNavSharedService,
                      sharedProperties) {

                //$scope.onClickMenu = function () {
                //    $mdSidenav('left').toggle();
                //};
                //
                //$scope.menu = ssSideNav;

                // Listen event SS_SIDENAV_CLICK_ITEM to close menu
                $rootScope.$on('SS_SIDENAV_CLICK_ITEM', function () {
                    console.log('do whatever you want after click on item');
                });

                $scope.headerTitle = sharedProperties.getToolbarTitle();

                // _perform_change_for_demo();
            }
        ]);
    //.run(['$rootScope', '$state', '$stateParams',
    //    function ($rootScope, $state, $stateParams) {
    //        $rootScope.$state = $state;
    //        $rootScope.$stateParams = $stateParams;
    //    }
    //])

})();

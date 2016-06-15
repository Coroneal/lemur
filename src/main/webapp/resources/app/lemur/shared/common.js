
'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:CommonCtrl
 * @description
 * # CommonCtrl
 * Controller of the demoApp
 */
angular.module('lemurApp')
    .controller('CommonCtrl', [
        '$scope',
        '$mdSidenav',
        '$timeout',
        '$rootScope',
        '$state',
        'ssSideNav',
        'ssSideNavSharedService',
        function (
            $scope,
            $mdSidenav,
            $timeout,
            $rootScope,
            $state,
            ssSideNav,
            ssSideNavSharedService) {


            $scope.menu = ssSideNav;
            $rootScope.headerTitle = 'Common';
            // Listen event SS_SIDENAV_CLICK_ITEM to close menu
            $rootScope.$on('SS_SIDENAV_CLICK_ITEM', function() {
                console.log('do whatever you want after click on item');
            });

            // _perform_change_for_demo();
        }
    ]);
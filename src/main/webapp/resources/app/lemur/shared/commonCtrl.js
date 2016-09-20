(function(){
    "use strict";

    angular.module('lemurApp')
        .controller('CommonCtrl', ['$scope', '$mdSidenav', '$timeout', '$rootScope', '$state', 'ssSideNav', 'ssSideNavSharedService',
            function ($scope, $mdSidenav, $timeout, $rootScope, $state, ssSideNav) {


                $scope.menu = ssSideNav;
                $rootScope.headerTitle = 'Common';
                $rootScope.$on('SS_SIDENAV_CLICK_ITEM', function () {
                    console.log('clicked left menu');
                });
            }
        ]);
})();
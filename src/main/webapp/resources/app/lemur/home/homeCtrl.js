'use strict';

angular.module('lemurApp')
    .controller('HomeCtrl', [
        '$scope',
        '$rootScope',
        'UserService',
        'sharedUserDataService',
        function ($scope,
                  $rootScope,
                  UserService,
                  sharedUserDataService) {

            $rootScope.headerTitle = 'Welcome Page';

            UserService.getUserDetails(sharedUserDataService.getLoggedUser())
                .then(function (data) {

                        $scope.vm.errorMessages = [];
                        $scope.vm.menu.username = data.userName;
                        $scope.vm.menu.email = data.email;
                    },
                    function (errorMessage) {
                    });
        }
    ]);
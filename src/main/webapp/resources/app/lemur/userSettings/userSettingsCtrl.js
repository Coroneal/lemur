'use strict';

angular.module('lemurApp')
    .controller('userSettingsCtrl', ['$scope', '$rootScope', 'UserService', 'sharedUserDataService',
        function ($scope, $rootScope, UserService, sharedUserDataService) {

            $rootScope.headerTitle = 'User settings';
            $scope.user = {};

            UserService.getUserDetails(sharedUserDataService.getLoggedUser())
                .then(function (data) {
                        $scope.user = data;
                    });
        }
    ]);
'use strict';

angular.module('lemurApp')
    .controller('HomeCtrl', [
        '$scope',
        '$rootScope',
        function ($scope,
                  $rootScope) {
            $rootScope.headerTitle = 'Home';
        }
    ]);
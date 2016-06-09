'use strict';

angular.module('lemurApp')
    .controller('CommonCtrl', [
        '$scope',
        'sharedProperties',
        function ($scope,
                  sharedProperties) {
            sharedProperties.setToolbarTitle('About');
            $scope.test = 'asdas';
        }
    ]);
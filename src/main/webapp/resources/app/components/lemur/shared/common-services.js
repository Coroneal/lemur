'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:CommonCtrl
 * @description
 * # CommonCtrl
 * Controller of the demoApp
 */
angular.module('lemurApp')
    .service('sharedProperties', function () {
        var toolbarTitle = 'Home';

        return {
            getToolbarTitle: function () {
                return toolbarTitle;
            },
            setToolbarTitle: function (value) {
                toolbarTitle = value;
            }
        };
    });
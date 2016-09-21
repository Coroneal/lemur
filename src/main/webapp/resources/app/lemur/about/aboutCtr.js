(function(){
    "use strict";

    angular.module('lemurApp')
        .controller('aboutCtrl', ['$scope', '$rootScope',
            function ($scope, $rootScope) {

                $rootScope.headerTitle = 'About';
            }
        ]);
})();
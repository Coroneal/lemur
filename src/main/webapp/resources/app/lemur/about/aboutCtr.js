(function(){
    "use strict";

    angular.module('lemurApp')
        .controller('AboutCtrl', ['$scope', '$rootScope',
            function ($scope, $rootScope) {

                $rootScope.headerTitle = 'About';
            }
        ]);
})();
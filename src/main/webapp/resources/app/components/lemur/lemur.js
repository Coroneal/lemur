(function(){
    'use strict';

    // Prepare the 'users' module for subsequent registration of controllers and delegates
    angular.module('lemur', [ 'ngMaterial' ]);
    angular.module('myMenuApp.controllers', ['common.directives']);
    angular.module('common.directives', ['common.services']);

})();

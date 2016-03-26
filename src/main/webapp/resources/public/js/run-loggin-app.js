///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Defines the javascript files that need to be loaded and their dependencies.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

require.config({
    paths: {
        angular: '../../bower_components/angular/angular',
        angularMessages: '../../bower_components/angular-messages/angular-messages',
        angularAria: '../../bower_components/angular-aria/angular-aria',
        angularAnimate: '../../bower_components/angular-animate/angular-animate',
        angularMaterial: '../../bower_components/angular-material/angular-material',
        csrfInterceptor: '../../bower_components/spring-security-csrf-token-interceptor/dist/spring-security-csrf-token-interceptor.min',
        lodash: "../../bower_components/lodash/dist/lodash",
        common: 'common',
        loginApp: 'login'
    },
    shim: {
        angular: {
            exports: "angular"
        },
        csrfInterceptor: {
            deps: ['angular']
        },
        angularMessages: {
            deps: ['angular']
        },
        angularAria: {
            deps: ['angular']
        },
        angularAnimate: {
            deps: ['angular']
        },
        angularMaterial: {
            deps: ['angular']
        },
        common: {
            deps: ['angular', 'csrfInterceptor', 'angularMessages', 'angularMessages', 'angularAria', 'angularAnimate','angularMaterial']
        },
        loginApp: {
            deps: ['common']
        }
    }
});

require(['loginApp'], function () {

    angular.bootstrap(document.getElementById('loginApp'), ['loginApp']);

});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Defines the javascript files that need to be loaded and their dependencies.
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////

require.config({
    paths: {
        angular: '../bower_components/angular/angular',
        angularMessages: '../bower_components/angular-messages/angular-messages',
        angularAria: '../bower_components/angular-aria/angular-aria',
        angularAnimate: '../bower_components/angular-animate/angular-animate',
        angularMaterial: '../bower_components/angular-material/angular-material',
        csrfInterceptor: '../bower_components/spring-security-csrf-token-interceptor/dist/spring-security-csrf-token-interceptor.min',
        lodash: "../bower_components/lodash/dist/lodash",
        common: '../app/components/login/common',
        newUser: '../app/components/login/newUser',
        loginApp: '../app/components/login/login'
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
        newUser: {
            deps: ['common']
        },
        loginApp: {
            deps: ['common']
        }
    }
});

require(['loginApp'], function () {
    angular.bootstrap(document.getElementById('loginApp'), ['loginApp']);
});

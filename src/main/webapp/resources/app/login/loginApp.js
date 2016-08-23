angular.module('loginApp', ['spring-security-csrf-token-interceptor', 'ngMaterial', 'ngMessages'])
    .config(function ($mdThemingProvider) {

        $mdThemingProvider.definePalette('lemurPalette', {
            '50': '#f9fbe7',
            '100': '#f0f4c3',
            '200': '#e6ee9c',
            '300': '#dce775',
            '400': '#d4e157',
            '500': '#cddc39',
            '600': '#c0ca33',
            '700': '#afb42b',
            '800': '#9e9d24',
            '900': '#827717',
            'A100': '#f4ff81',
            'A200': '#eeff41',
            'A400': '#c6ff00',
            'A700': '#aeea00',
            'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'],
            'contrastLightColors': '900',       // could also specify this if default was 'dark'
            'contrastStrongLightColors': '900'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('lemurPalette');
    });
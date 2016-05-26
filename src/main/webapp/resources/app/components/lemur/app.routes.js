/**
 * Created by root on 26.05.16.
 */
(function () {

    'use strict';

// Declare app level module which depends on filters, and services

    angular.module('myMenuApp', [
            'myMenuApp.controllers',
            'ngAnimate',
            'ui.router',
            'ngMaterial',
            'ngAria',

        ])
        .config(function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('light-blue', {
                    'default': '300'
                })
                .accentPalette('deep-orange', {
                    'default': '500'
                });
        })
        .config(['$stateProvider', '$urlRouterProvider', '$logProvider',
            function ($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise("/");

                $stateProvider
                    .state('home', {
                        url: '/',

                        views: {

                            '@': {
                                templateUrl: 'home.view.html',
                                controller: 'HomeCtrl as vm'
                            }
                        }
                    })
                    .state('home.beers', {
                        url: 'beers',
                        abstract: true
                    })
                    .state('home.beers.ipas', {
                        url: '/ipas',

                        views: {

                            'content@home': {
                                templateUrl: 'beers.ipa.view.html'
                            }
                        }
                    })
                    .state('home.beers.porters', {
                        url: '/porters',

                        views: {

                            'content@home': {
                                templateUrl: 'beers.porters.view.html'
                            }
                        }
                    })
                    .state('home.beers.wheat', {
                        url: '/wheat',

                        views: {

                            'content@home': {
                                templateUrl: 'beers.wheat.view.html'
                            }
                        }
                    })
            }])
        //take all whitespace out of string
        .filter('nospace', function () {
            return function (value) {
                return (!value) ? '' : value.replace(/ /g, '');
            };
        })
        //replace uppercase to regular case
        .filter('humanizeDoc', function () {
            return function (doc) {
                if (!doc) return;
                if (doc.type === 'directive') {
                    return doc.name.replace(/([A-Z])/g, function ($1) {
                        return '-' + $1.toLowerCase();
                    });
                }

                return doc.label || doc.name;
            };
        });

})();
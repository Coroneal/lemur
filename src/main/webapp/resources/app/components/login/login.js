angular.module('loginApp', ['common', 'spring-security-csrf-token-interceptor', 'ngMaterial', 'ngMessages'])
    .config(function ($mdThemingProvider, $mdIconProvider) {

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
    })
    .controller('LoginCtrl', ['$scope', '$http', '$mdSidenav', 'UserService', '$mdToast',
        function ($scope, $http, $mdSidenav, UserService) {

            function buildToggler(navID) {
                return function () {
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            console.log("toggle " + navID + " is done");
                        });
                    $scope.blur();
                }
            }

            $scope.toggleRight = buildToggler('right');

            $scope.isOpenRight = function () {
                return $mdSidenav('right').isOpen();
            };

            $scope.onLogin = function () {
                console.log('Attempting login with username ' + $scope.vm.username + ' and password ' + $scope.vm.password);

                $scope.vm.submitted = true;

                if ($scope.form.$invalid) {
                    return;
                }

                var successFn = function () {
                    window.location.replace('/resources/index.html');
                };
                var failFn = function () {

                    $scope.form.username.$setValidity("authenticate", false);
                    $scope.form.password.$setValidity("authenticate", false);

                };
                UserService.login($scope.vm.username, $scope.vm.password, successFn, failFn);
            };
        }]);

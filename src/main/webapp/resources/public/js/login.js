angular.module('loginApp', ['common', 'spring-security-csrf-token-interceptor','ngMaterial', 'ngMessages'])
    .config(function($mdThemingProvider, $mdIconProvider){

        $mdThemingProvider.theme('default')
            .primaryPalette('grey', {
                'default': '900',
                'hue-2': '500'
            })
            //.backgroundPalette('grey', {
            //    'default': '200'
            //})
            .accentPalette('orange');
    })
    .controller('LoginCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.onLogin = function () {
            console.log('Attempting login with username ' + $scope.vm.username + ' and password ' + $scope.vm.password);

            $scope.vm.submitted = true;

            if ($scope.form.$invalid) {
                return;
            }
            $scope.login($scope.vm.userName, $scope.vm.password);
        };
    }]);
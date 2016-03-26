angular.module('loginApp', ['common', 'spring-security-csrf-token-interceptor','ngMaterial'])
    .config(function($mdThemingProvider, $mdIconProvider){

        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('yellow');
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
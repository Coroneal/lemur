angular.module('loginApp')
    .controller('NewUserCtrl', function ($scope, $timeout, $mdSidenav, $log) {

        $scope.createUser = function () {
            console.log('Creating user with username ' + $scope.vm.newUsername + ' and password ' + $scope.vm.newPassword);

            $scope.vm.submitted = true;

            if ($scope.registerForm.$invalid) {
                return;
            }

            var postData = {
                username: $scope.vm.newUsername,
                plainTextPassword: $scope.vm.newPassword,
                email: $scope.vm.newEmail
            };

            $http({
                method: 'POST',
                url: '/user',
                data: postData,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/plain"
                }
            })
                .then(function (response) {
                    if (response.status == 200) {
                        $scope.login($scope.vm.newUsername, $scope.vm.newPassword);
                    }
                    else {
                        $scope.vm.errorMessages = [];
                        $scope.vm.errorMessages.push({description: response.data});
                        console.log("failed user creation: " + response.data);
                    }
                });
        };

        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
            $scope.blur();
        };
    });

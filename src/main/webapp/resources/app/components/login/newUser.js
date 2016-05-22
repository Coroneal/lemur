angular.module('loginApp')
    .controller('NewUserCtrl', ['$scope', '$timeout', '$http', '$mdSidenav', '$log','$mdDialog', '$mdMedia',
        function ($scope, $timeout, $http, $mdSidenav, $log, $mdDialog, $mdMedia) {

        $scope.createUser = function (newUsername, newMail, newPassword) {
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
                        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

                        var confirm = $mdDialog.alert()
                            .parent(angular.element(document.querySelector('#newUser')))
                            .clickOutsideToClose(true)
                            .title('User added')
                            .textContent('Now you can log in')
                            .ok('Got it!');
                        $mdDialog.show(confirm)
                            .then(function() {
                                $scope.vm.username = postData.username;
                                $scope.vm.password = postData.plainTextPassword;
                                $scope.closeRightNav();
                            });
                    }
                    else {
                        $scope.vm.errorMessages = [];
                        $scope.vm.errorMessages.push({description: response.data});
                        console.log("failed user creation: " + response.data);
                    }
                });
        };

        $scope.closeRightNav = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
            $scope.blur();
        };
    }]);

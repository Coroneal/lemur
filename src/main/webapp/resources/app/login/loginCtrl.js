angular.module('loginApp')
    .controller('BaseFormCtrl', ['$scope', function ($scope) {

        $scope.vm = {};

        function markAppAsInitialized() {
            if ($scope.vm.appReady === undefined) {
                $scope.vm.appReady = true;
            }
        }

        markAppAsInitialized();
    }])
    .controller('NewUserCtrl', ['$scope', '$timeout', '$http', '$mdSidenav', '$log', '$mdDialog', '$mdMedia',
        function ($scope, $timeout, $http, $mdSidenav, $log, $mdDialog, $mdMedia) {

            var fieldWithFocus;

            $scope.vm.registerForm = {
                submitted: false,
                errorMessages: []
            };

            $scope.vm.registerFormPristine = angular.copy($scope.vm.registerForm);

            $scope.focus = function (fieldName) {
                fieldWithFocus = fieldName;
                if (fieldWithFocus === 'username' || fieldWithFocus === 'password') {
                    $scope.loginForm.username.$setValidity("authenticate", true);
                    $scope.loginForm.password.$setValidity("authenticate", true);
                }
            };

            $scope.blur = function () {
                fieldWithFocus = undefined;
            };

            $scope.isMessagesVisible = function (fieldName) {
                return fieldWithFocus === fieldName || $scope.vm.registerForm.submitted;
            };

            $scope.clearRegisterForm = function () {
                $scope.vm.registerForm = angular.copy($scope.vm.registerFormPristine);
                $scope.registerForm.$setPristine();
                $scope.registerForm.$setValidity();
                $scope.registerForm.$setUntouched();
            };


            $scope.createUser = function () {

                console.log('Creating user with username ' + $scope.vm.registerForm.newUsername + ' and password ' + $scope.vm.registerForm.newPassword);

                $scope.vm.registerForm.submitted = true;

                if ($scope.registerForm.$invalid) {
                    return;
                }

                var postData = {
                    username: $scope.vm.registerForm.newUsername,
                    plainTextPassword: $scope.vm.registerForm.newPassword,
                    email: $scope.vm.registerForm.newEmail
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
                                .then(function () {
                                    $scope.closeRightNav();
                                    $scope.clearRegisterForm();
                                    $scope.vm.loginForm.username = postData.username;
                                    $scope.vm.loginForm.password = postData.plainTextPassword;
                                    $scope.blur();
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
        }])
    .controller('LoginCtrl', ['$scope', '$http', '$mdSidenav', '$mdToast', 'UserService', 'sharedUserDataService',
        function ($scope, $http, $mdSidenav, $mdToast, UserService, sharedUserDataService) {

            var fieldWithFocus;

            $scope.vm.loginForm = {
                submitted: false,
                errorMessages: []
            };

            $scope.vm.loginFormPristine = angular.copy($scope.vm.loginForm);

            $scope.focus = function (fieldName) {
                fieldWithFocus = fieldName;
                if (fieldWithFocus === 'username' || fieldWithFocus === 'password') {
                    $scope.loginForm.username.$setValidity("authenticate", true);
                    $scope.loginForm.password.$setValidity("authenticate", true);
                }
            };

            $scope.blur = function () {
                fieldWithFocus = undefined;
            };

            $scope.isMessagesVisible = function (fieldName) {
                return fieldWithFocus === fieldName || $scope.vm.loginForm.submitted;
            };

            function buildToggler(navID) {
                return function () {
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            console.log("toggle " + navID + " is done");
                        });
                    $scope.blur();
                };
            }

            $scope.toggleRight = buildToggler('right');

            $scope.isOpenRight = function () {
                return $mdSidenav('right').isOpen();
            };

            $scope.onLogin = function () {
                console.log('Attempting login with username ' + $scope.vm.loginForm.username + ' and password ' + $scope.vm.loginForm.password);

                $scope.vm.loginForm.submitted = true;

                if ($scope.loginForm.$invalid) {
                    return;
                }

                var successFn = function () {
                    sharedUserDataService.setLoggedUser($scope.vm.loginForm.username);
                    window.location.href = "/resources/app/lemur/app.html";
                };
                var failFn = function () {
                    $scope.loginForm.username.$setValidity("authenticate", false);
                    $scope.loginForm.password.$setValidity("authenticate", false);
                };
                UserService.login($scope.vm.loginForm.username, $scope.vm.loginForm.password, successFn, failFn);
            };
        }]);


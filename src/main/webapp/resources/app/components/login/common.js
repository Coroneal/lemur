angular.module('common', ['ngMaterial'])
    .controller('BaseFormCtrl', ['$scope', '$http', function ($scope, $http) {

        var fieldWithFocus;

        $scope.vm = {
            submitted: false,
            errorMessages: []
        };

        $scope.focus = function (fieldName) {
            fieldWithFocus = fieldName;
        };

        $scope.blur = function () {
            fieldWithFocus = undefined;
        };

        $scope.isMessagesVisible = function (fieldName) {
            //return fieldWithFocus === fieldName || $scope.vm.submitted;
            if(fieldWithFocus !== fieldName){
                return false;
            }
            return true;
        };

        $scope.preparePostData = function () {
            var username = $scope.vm.username != undefined ? $scope.vm.username : '';
            var password = $scope.vm.password != undefined ? $scope.vm.password : '';
            var email = $scope.vm.email != undefined ? $scope.vm.email : '';

            return 'username=' + username + '&password=' + password + '&email=' + email;
        };


        function markAppAsInitialized() {
            if ($scope.vm.appReady == undefined) {
                $scope.vm.appReady = true;
            }
        }

        $scope.login = function (username, password) {
            var postData = $scope.preparePostData();

            $http({
                method: 'POST',
                url: '/authenticate',
                data: postData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-Login-Ajax-call": 'true'
                }
            })
                .then(function (response) {
                    if (response.data == 'ok') {
                        window.location.replace('/resources/index.html');
                    }
                    else {
                        $scope.vm.errorMessages = [];
                        $scope.vm.errorMessages.push({description: 'Access denied'});
                    }
                });
        };

        markAppAsInitialized();

    }])
    .directive('equals', function () {

        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function(scope, elem, attrs, ngModel) {
                if(!ngModel){
                    return;
                } // do nothing if no ng-model


                // watch own value and re-validate on change
                scope.$watch(attrs.ngModel, function() {
                    validate();
                });

                // observe the other value and re-validate on change
                attrs.$observe('equals', function (val) {
                    validate();
                });

                var validate = function() {
                    // values
                    var val1 = ngModel.$viewValue;
                    var val2 = attrs.equals;

                    // set validity
                    ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
                };
            }
        };
    });
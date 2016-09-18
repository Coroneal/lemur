angular.module('loginApp')
    .directive('usernameAvailable', ['$http', '$q', function ($http, $q) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {

                ctrl.$asyncValidators.usernameExists = function (modelValue, viewValue) {
                    return $q(function (resolve, reject) {

                        $http.get('/user/check', {
                                params: {
                                    username: viewValue
                                }
                            })
                            .then(function (response) {
                                if (response.status == 200) {
                                    var isUnique = response.data.success;
                                    ctrl.$setValidity('usernameAvailable', isUnique);
                                    resolve();
                                }
                            }, function () {
                                reject();
                            });
                    });
                };
            }
        };
    }])
    .directive('equals', function () {

        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function (scope, elem, attrs, ngModel) {
                if (!ngModel) {
                    return;
                } // do nothing if no ng-model


                // watch own value and re-validate on change
                scope.$watch(attrs.ngModel, function () {
                    validate();
                });

                // observe the other value and re-validate on change
                attrs.$observe('equals', function (val) {
                    validate();
                });

                var validate = function () {
                    // values
                    var val1 = ngModel.$viewValue;
                    var val2 = attrs.equals;

                    // set validity
                    ngModel.$setValidity('equals', !val1 || !val2 || val1 === val2);
                };
            }
        };
    });
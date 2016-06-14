angular.module('loginApp')
    .service('UserService', ['$http', '$q', function ($http, $q) {

        this.login = function (username, password, succFn, failFn) {
            var postUsername = username != undefined ? username : '';
            var postPassword = password != undefined ? password : '';

            var postData = 'username=' + postUsername + '&password=' + postPassword + '&email=""';

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
                        succFn();
                    }
                    else {
                        failFn();
                    }
                });
        };
    }]);
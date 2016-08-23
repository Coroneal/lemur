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

        this.getUserDetails = function (username) {
            var deferred = $q.defer();

            $http.get('/user/details', {
                    params: {
                        username: username
                    }
                })
                .then(function (response) {
                    if (response.status == 200) {
                        deferred.resolve(response.data);
                    }
                    else {
                        deferred.reject('Error retrieving list of meals');
                    }
                });

            return deferred.promise;
        };

    }])
    .service('sharedUserDataService', function ($window) {
        var USER_KEY = 'LemurApp.user';

        function getProperty(KEY) {
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
        }

        return {
            setLoggedUser: function (user) {
                $window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
            },
            getLoggedUser: function () {
                return getProperty(USER_KEY);
            }
        }
    });
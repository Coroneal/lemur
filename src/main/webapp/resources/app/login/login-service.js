angular.module('loginApp')
    .service('UserService', ['$http', function ($http) {

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
    }])
    .service('sharedUserDataService', function ($window) {
        var USER_KEY = 'LemurApp.user';

        return {
            setLoggedUser: function (user) {
                $window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
            },
            getLoggedUser: function () {
                var mydata = $window.sessionStorage.getItem(USER_KEY);
                if (mydata) {
                    mydata = JSON.parse(mydata);
                }
                return mydata || [];
            }
            //,
            //setLoggedUser: function (user) {
            //    var mydata = $window.sessionStorage.getItem(USER_KEY);
            //    if (mydata) {
            //        mydata = JSON.parse(mydata);
            //    } else {
            //        mydata = [];
            //    }
            //    mydata.push(user);
            //    $window.sessionStorage.setItem(USER_KEY, JSON.stringify(mydata));
            //},
            //getLoggedUser: function () {
            //    var mydata = $window.sessionStorage.getItem(USER_KEY);
            //    if (mydata) {
            //        mydata = JSON.parse(mydata);
            //    }
            //    return mydata || [];
            //}
        };
    });
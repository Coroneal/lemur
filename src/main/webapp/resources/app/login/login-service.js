angular.module('loginApp')
    .service('sharedDataService', function ($window) {
        var KEY = 'App.SelectedValue';

        var addData = function (newObj) {
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            } else {
                mydata = [];
            }
            mydata.push(newObj);
            $window.sessionStorage.setItem(KEY, JSON.stringify(mydata));
        };

        var getData = function () {
            var mydata = $window.sessionStorage.getItem(KEY);
            if (mydata) {
                mydata = JSON.parse(mydata);
            }
            return mydata || [];
        };

        return {
            addData: addData,
            getData: getData
        };
    })
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
    }]);
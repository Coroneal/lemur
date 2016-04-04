angular.module('loginApp')
    .service('UserService', ['$http', '$q', function ($http, $q) {
        return {

            login: function (username, password, succFn, failFn) {

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
            },
            //saveMeals: function (dirtyMeals) {
            //    var deferred = $q.defer();
            //
            //    $http({
            //        method: 'POST',
            //        url: '/meal',
            //        data: dirtyMeals,
            //        headers: {
            //            "Content-Type": "application/json",
            //            "Accept": "text/plain, application/json"
            //        }
            //    })
            //        .then(function (response) {
            //            if (response.status == 200) {
            //                deferred.resolve();
            //            }
            //            else {
            //                deferred.reject("Error saving meals: " + response.data);
            //            }
            //        });
            //
            //    return deferred.promise;
            //}
        }
    }]);
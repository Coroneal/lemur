angular.module('frontendServices', [])
    .service('MealService', ['$http', '$q', function ($http, $q) {
        return {
            searchMeals: function (fromDate, fromTime, toDate, toTime, pageNumber) {
                var deferred = $q.defer();

                function prepareTime(time) {
                    return time ? '1970/01/01 ' + time : null;
                }

                $http.get('/meal/', {
                    params: {
                        fromDate: fromDate,
                        toDate: toDate,
                        fromTime: prepareTime(fromTime),
                        toTime: prepareTime(toTime),
                        pageNumber: pageNumber
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
            },

            deleteMeals: function (deletedMealIds) {
                var deferred = $q.defer();

                $http({
                    method: 'DELETE',
                    url: '/meal',
                    data: deletedMealIds,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve();
                        }
                        else {
                            deferred.reject('Error deleting meals');
                        }
                    });

                return deferred.promise;
            },

            saveMeals: function (dirtyMeals) {
                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: '/meal',
                    data: dirtyMeals,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "text/plain, application/json"
                    }
                })
                    .then(function (response) {
                        if (response.status == 200) {
                            deferred.resolve();
                        } else {
                            deferred.reject("Error saving meals: " + response.data);
                        }
                    });

                return deferred.promise;
            }
        }
    }])
    .service('WeatherService', ['$http', '$q', function ($http, $q) {
        return {
            getWeather: function () {
                var deferred = $q.defer();

                $http.get('/weather/')
                    .then(function (response) {
                        if (response.status == 200) {
                            console.log(response.data);
                            deferred.resolve(response.data);
                        }
                        else {
                            deferred.reject('Error retrieving list of meals');
                        }
                    });

                return deferred.promise;
            },
            getWeatherFromAPI: function () {
                var deferred = $q.defer();

                var key = '20e818b3efbe65c01ea2b3c7629937c4';
                var days = '3';
                var cityID = '7530768';
                var url = 'http://api.openweathermap.org/data/2.5/forecast?';

                var address = url + 'id=' + cityID + '&cnt=' + days + '&APPID=' + key;


//                var url = 'http://api.openweathermap.org/data/2.5/weather';
                $http.jsonp(address, { params: {
//                    q : $scope.city,
//                    units : $scope.units,
                    callback: 'JSON_CALLBACK'
                }}).
                    success(function (data, status, headers, config) {
                        console.log(data);
                        deferred.resolve(data);
                    }).
                    error(function (data, status, headers, config) {
                        console.log('Error retrieving weather info');
                        deferred.reject(err);
                    });
//                $http.get(address)
//                    .success(function (data) {
//                        deferred.resolve(response.data);
//                    })
//                    .error(function (err) {
//                        console.log('Error retrieving weather info');
//                        deferred.reject(err);
//                    });

                return deferred.promise;
            }
        }
    }]);
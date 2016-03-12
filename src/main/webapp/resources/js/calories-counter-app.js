angular.module('caloriesCounterApp', ['editableTableWidgets', 'frontendServices', 'spring-security-csrf-token-interceptor'])
    .filter('excludeDeleted', function () {
        return function (input) {
            return _.filter(input, function (item) {
                return item.deleted == undefined || !item.deleted;
            });
        }
    })
    .provider('Weather', function () {
        var apiKey = "";

        this.getUrl = function (type, ext) {
            return "http://api.wunderground.com/api/" +
                this.apiKey + "/" + type + "/q/" +
                ext + '.json';
        };

        this.setApiKey = function (key) {
            if (key) this.apiKey = key;
        };

        this.$get = function ($q, $http) {
            var self = this;
            return {
                getWeatherForecast: function (city) {
                    var d = $q.defer();
                    $http.jsonp({
                        method: 'GET',
                        url: self.getUrl("forecast", city),
                        cache: true
                    }).success(function (data) {
                        // The wunderground API returns the
                        // object that nests the forecasts inside
                        // the forecast.simpleforecast key
                        d.resolve(data.forecast.simpleforecast);
                    }).error(function (err) {
                        d.reject(err);
                    });
                    return d.promise;
                }
            }
        }
    })
    .config(function (WeatherProvider) {
        WeatherProvider.setApiKey('0c01e67cc51eb9f3');
    })
    .controller('WeatherCtrl', ['$scope', 'WeatherService', '$timeout', 'Weather', function ($scope, WeatherService, $timeout, Weather) {
        // Build the date object
        $scope.date = {};

        // Update function
        var updateTime = function () {
            $scope.date.raw = new Date();
            $timeout(updateTime, 1000);
        };

        // Kick off the update function
        updateTime();

        $scope.weather = {};
        // Hardcode San_Francisco for now
        WeatherService.getWeather()
            .then(function (data) {
                var log = [];
                angular.forEach(data.weathers, function (value) {
                    value.img = 'resources/img/' + value.description + '.png';
                }, log);
                $scope.weather.forecast = data;
            });

        WeatherService.getWeatherFromAPI()
            .then(function (data) {
                console.log('FOUND II!');
                console.log(data);
                $scope.weatherAPI = data;
//                var log = [];
//                angular.forEach(data.weathers, function (value) {
//                    value.img = 'resources/img/' + value.description + '.png';
//                }, log);
//                $scope.weather.forecast = data;
            });
        //
        //$scope.weather = {}
        //// Hardcode San_Francisco for now
        //Weather.getWeatherForecast("CA/San_Francisco")
        //    .then(function (data) {
        //        $scope.weather.forecast = data;
        //    });
    }])
    .controller('CaloriesTrackerCtrl', ['$scope', 'MealService', '$timeout',
        function ($scope, MealService, $timeout) {

            $scope.vm = {
                maxCaloriesPerDay: 2000,
                currentPage: 1,
                totalPages: 0,
                originalMeals: [],
                meals: [],
                isSelectionEmpty: true,
                errorMessages: [],
                infoMessages: []
            };
            function showErrorMessage(errorMessage) {
                clearMessages();
                $scope.vm.errorMessages.push({description: errorMessage});
            }

            function markAppAsInitialized() {
                if ($scope.vm.appReady == undefined) {
                    $scope.vm.appReady = true;
                }
            }

            function loadMealData(fromDate, fromTime, toDate, toTime, pageNumber) {
                MealService.searchMeals(fromDate, fromTime, toDate, toTime, pageNumber)
                    .then(function (data) {

                        $scope.vm.errorMessages = [];
                        $scope.vm.currentPage = data.currentPage;
                        $scope.vm.totalPages = data.totalPages;

                        $scope.vm.originalMeals = _.map(data.meals, function (meal) {
                            meal.datetime = meal.date + ' ' + meal.time;
                            return meal;
                        });

                        $scope.vm.meals = _.cloneDeep($scope.vm.originalMeals);

                        _.each($scope.vm.meals, function (meal) {
                            meal.selected = false;
                        });

                        markAppAsInitialized();

                        if ($scope.vm.meals && $scope.vm.meals.length == 0) {
                            showInfoMessage("No results found.");
                        }
                    },
                    function (errorMessage) {
                        showErrorMessage(errorMessage);
                        markAppAsInitialized();
                    });
            }

            function clearMessages() {
                $scope.vm.errorMessages = [];
                $scope.vm.infoMessages = [];
            }

            function showInfoMessage(infoMessage) {
                $scope.vm.infoMessages = [];
                $scope.vm.infoMessages.push({description: infoMessage});
                $timeout(function () {
                    $scope.vm.infoMessages = [];
                }, 1000);
            }

            $scope.selectionChanged = function () {
                $scope.vm.isSelectionEmpty = !_.any($scope.vm.meals, function (meal) {
                    return meal.selected && !meal.deleted;
                });
            };

            $scope.pages = function () {
                return _.range(1, $scope.vm.totalPages + 1);
            };

            $scope.search = function (page) {

                var fromDate = new Date($scope.vm.fromDate);
                var toDate = new Date($scope.vm.toDate);

                console.log('search from ' + $scope.vm.fromDate + ' ' + $scope.vm.fromTime + ' to ' + $scope.vm.toDate + ' ' + $scope.vm.toTime);

                var errorsFound = false;

                if ($scope.vm.fromDate && !$scope.vm.toDate || !$scope.vm.fromDate && $scope.vm.toDate) {
                    showErrorMessage("Both from and to dates are needed");
                    errorsFound = true;
                    return;
                }

                if (fromDate > toDate) {
                    showErrorMessage("From date cannot be larger than to date");
                    errorsFound = true;
                }

                if (fromDate.getTime() == toDate.getTime() && $scope.vm.fromTime &&
                    $scope.vm.toTime && $scope.vm.fromTime > $scope.vm.toTime) {
                    showErrorMessage("Inside same day, from time cannot be larger than to time");
                    errorsFound = true;
                }

                if (!errorsFound) {
                    loadMealData($scope.vm.fromDate, $scope.vm.fromTime, $scope.vm.toDate, $scope.vm.toTime, page == undefined ? 1 : page);
                }

            };

            $scope.previous = function () {
                if ($scope.vm.currentPage > 1) {
                    $scope.vm.currentPage -= 1;
                    loadMealData($scope.vm.fromDate, $scope.vm.fromTime,
                        $scope.vm.toDate, $scope.vm.toTime, $scope.vm.currentPage);
                }
            };

            $scope.next = function () {
                if ($scope.vm.currentPage < $scope.vm.totalPages) {
                    $scope.vm.currentPage += 1;
                    loadMealData($scope.vm.fromDate, $scope.vm.fromTime,
                        $scope.vm.toDate, $scope.vm.toTime, $scope.vm.currentPage);
                }
            };

            $scope.goToPage = function (pageNumber) {
                if (pageNumber > 0 && pageNumber <= $scope.vm.totalPages) {
                    $scope.vm.currentPage = pageNumber;
                    loadMealData($scope.vm.fromDate, $scope.vm.fromTime, $scope.vm.toDate, $scope.vm.toTime, pageNumber);
                }
            };

            $scope.add = function () {
                $scope.vm.meals.unshift({
                    id: null,
                    datetime: null,
                    description: null,
                    calories: null,
                    selected: false,
                    new: true
                });
            };

            $scope.delete = function () {
                var deletedMealIds = _.chain($scope.vm.meals)
                    .filter(function (meal) {
                        return meal.selected && !meal.new;
                    })
                    .map(function (meal) {
                        return meal.id;
                    })
                    .value();

                MealService.deleteMeals(deletedMealIds)
                    .then(function () {
                        clearMessages();
                        showInfoMessage("deletion successful.");

                        _.remove($scope.vm.meals, function (meal) {
                            return meal.selected;
                        });

                        $scope.selectionChanged();
                    },
                    function () {
                        clearMessages();
                        $scope.vm.errorMessages.push({description: "deletion failed."});
                    });
            };

            $scope.reset = function () {
                $scope.vm.meals = $scope.vm.originalMeals;
            };

            function getNotNew(meals) {
                return _.chain(meals)
                    .filter(function (meal) {
                        return !meal.new;
                    })
                    .value();
            }

            function prepareMealsDto(meals) {
                return _.chain(meals)
                    .each(function (meal) {
                        if (meal.datetime) {
                            var dt = meal.datetime.split(" ");
                            meal.date = dt[0];
                            meal.time = dt[1];
                        }
                    })
                    .map(function (meal) {
                        return {
                            id: meal.id,
                            date: meal.date,
                            time: meal.time,
                            description: meal.description,
                            calories: meal.calories,
                            version: meal.version
                        }
                    })
                    .value();
            }

            $scope.save = function () {

                var maybeDirty = prepareMealsDto(getNotNew($scope.vm.meals));

                var original = prepareMealsDto(getNotNew($scope.vm.originalMeals));

                var dirty = _.filter(maybeDirty).filter(function (meal) {

                    var originalMeal = _.filter(original, function (orig) {
                        return orig.id === meal.id;
                    });

                    if (originalMeal.length == 1) {
                        originalMeal = originalMeal[0];
                    }

                    return originalMeal && ( originalMeal.date != meal.date ||
                        originalMeal.time != meal.time || originalMeal.description != meal.description ||
                        originalMeal.calories != meal.calories)
                });

                var newItems = _.filter($scope.vm.meals, function (meal) {
                    return meal.new;
                });

                var saveAll = prepareMealsDto(newItems);
                saveAll = saveAll.concat(dirty);

                $scope.vm.errorMessages = [];

                // save all new items plus the ones that where modified
                MealService.saveMeals(saveAll).then(function () {
                        $scope.search($scope.vm.currentPage);
                        showInfoMessage("Changes saved successfully");
                        //updateUserInfo();
                    },
                    function (errorMessage) {
                        showErrorMessage(errorMessage);
                    });

            };
            markAppAsInitialized();

        }]);


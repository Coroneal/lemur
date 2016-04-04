angular.module('loginApp')
    .factory('Common', function ($window) {

        var common = {};

        common.show = function (msg) {
            $window.alert(msg);
        };

        common.appendUrlData = function (url, attr, data) {
            var urlData = data != undefined ? data : '';
            if (url !== '') {
                url = url + '&';
            }
            return url + attr + '=' + urlData;
        };

        return common;
    });
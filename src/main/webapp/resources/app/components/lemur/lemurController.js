(function () {

    angular
        .module('lemur')
        .controller('lemurController', [
           '$mdSidenav', '$mdBottomSheet', '$timeout', '$log',
            lemurController
        ]);

    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function lemurController() {
        var self = this;

        self.selected = null;
        self.lemur = [];
        self.selectUser = selectUser;

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectUser(user) {
            self.selected = user;
        }

    }

})();


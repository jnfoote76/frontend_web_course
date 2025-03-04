(function () {
    'use strict';

    angular.module('LunchCheck', [])

        .controller('LunchCheckController', function ($scope) {
            $scope.lunchMenu = "";
            $scope.message = "Bruh..."

            $scope.checkIfTooMuch = function () {
                console.log("Checking...")
            };
        });

})();

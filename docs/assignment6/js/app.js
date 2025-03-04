(function () {
    'use strict';

    angular.module('LunchCheck', [])

        .controller('LunchCheckController', function ($scope) {
            $scope.lunchMenuStr = "";
            $scope.message = "";

            $scope.checkIfTooMuch = function () {
                if ($scope.lunchMenuStr === "") {
                    $scope.message = "Please enter data first";
                } else {
                    var lunchMenu = $scope.lunchMenuStr.split(",");
                    if (lunchMenu.length <= 3) {
                        $scope.message = "Enjoy!";
                    } else {
                        $scope.message = "Too much!";
                    }
                }
            };
        });

})();

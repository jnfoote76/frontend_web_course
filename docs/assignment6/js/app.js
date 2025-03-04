(function () {
    'use strict';

    angular.module('LunchCheck', [])

        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchMenuStr = "";
        $scope.message = "";
        $scope.messageBorder = "none";
        $scope.messageFontColor = "green";

        $scope.checkIfTooMuch = function () {
            if ($scope.lunchMenuStr === "") {
                $scope.message = "Please enter data first";
                $scope.messageBorder = "2px solid red";
                $scope.messageFontColor = "red";
            } else {
                var lunchMenu = $scope.lunchMenuStr.split(",");
                if (lunchMenu.length <= 3) {
                    $scope.message = "Enjoy!";
                } else {
                    $scope.message = "Too much!";
                }

                $scope.messageBorder = "2px solid green";
                $scope.messageFontColor = "green";
            }
        };
    }
})();

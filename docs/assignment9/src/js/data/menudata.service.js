(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$q', '$http']
    function MenuDataService($q, $http) {
        var service = this;

        service.getAllCategories = function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json'
            }
            ).then(function (result) {
                console.log(result);

                deferred.resolve(result.data);
            });

            return deferred.promise;
        };

        service.getItemsForCategory = function(categoryShortName) {
            var deferred = $q.defer();

            var myUrl = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/' + categoryShortName + '.json';

            $http({
                method: 'GET',
                url: myUrl
            }
            ).then(function (result) {
                console.log(result);

                deferred.resolve(result.data.menu_items);
            });

            return deferred.promise;
        }
    }

})();

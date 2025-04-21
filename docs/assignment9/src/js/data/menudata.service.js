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
    }

})();

(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  MenuSearchService.$inject = ['$http'];

  function NarrowItDownController(MenuSearchService) {
    var scope = this;

    scope.search = '';
    scope.found = [];

    scope.getMatchedMenuItems = function () {
      MenuSearchService.getMatchedMenuItems(scope.search)
        .then(function (result) {
          scope.found = result;
        })
    }

    scope.removeItem = function (index) {
      scope.found.splice(index, 1);
    }
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',

      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundItems',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
  }

  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json'
      }
      ).then(function (result) {
        var respData = result.data;
        var propertyNames = Object.keys(respData);

        var matchingItems = [];
        propertyNames.forEach((property) => {
          respData[property].menu_items.forEach((item) => {
            if (item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
              matchingItems.push(item);
            }
          });
        });

        return matchingItems;
      });
    };
  }
})();

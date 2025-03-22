(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var scope = this;
        scope.foo = "";

        scope.placeholderMethod = function () {
            console.log($scope.foo);
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var scope = this;
        scope.foo = "";

        scope.placeholderMethod = function () {
            console.log(scope.foo);
        };
    }

    function ShoppingListCheckOffService() {
        var service = this;
      
        // List of shopping items
        var items = [];
      
        service.addItem = function (itemName, quantity) {
          var item = {
            name: itemName,
            quantity: quantity
          };
          items.push(item);
        };
      
        service.removeItem = function (itemIndex) {
          items.splice(itemIndex, 1);
        };
      
        service.getItems = function () {
          return items;
        };
      }
})();

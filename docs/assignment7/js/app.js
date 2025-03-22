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
        scope.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

        scope.buyItem = function(index) {
            ShoppingListCheckOffService.buyItem(index);
        }
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var scope = this;
        scope.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;
      
        // List of shopping items
        var toBuyItems = [
            {
                "name": "cookies",
                "quantity": 1,
                "pricePerItem": 1
            },
            {
                "name": "jars of peanut butter",
                "quantity": 1,
                "pricePerItem": 2
            },
            {
                "name": "bags of pizza rolls",
                "quantity": 1,
                "pricePerItem": 5
            },
            {
                "name": "cheesecakes",
                "quantity": 1,
                "pricePerItem": 10
            },
            {
                "name": "steaks",
                "quantity": 1,
                "pricePerItem": 50
            },
            {
                "name": "tins of beluga caviar",
                "quantity": 1,
                "pricePerItem": 9001
            }
        ];

        var alreadyBoughtItems = [];
      
        service.getToBuyItems = function () {
          return toBuyItems;
        };

        service.getAlreadyBoughtItems = function() {
            return alreadyBoughtItems;
        }

        service.buyItem = function(index) {
            var item = toBuyItems[index];

            toBuyItems.splice(index, 1);
            alreadyBoughtItems.push(item);

            console.log(alreadyBoughtItems);
        }
      }
})();

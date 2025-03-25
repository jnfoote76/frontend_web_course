(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .filter('total_price_in_angular_dollars', TotalPriceInAngularDollarsFilter);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var scope = this;
        scope.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

        scope.buyItem = function (index) {
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
                "name": "peanut butter",
                "quantity": 1,
                "pricePerItem": 2.55
            },
            {
                "name": "pizza rolls",
                "quantity": 1,
                "pricePerItem": 5
            },
            {
                "name": "cheesecake",
                "quantity": 1,
                "pricePerItem": 10
            },
            {
                "name": "steak",
                "quantity": 1,
                "pricePerItem": 50
            },
            {
                "name": "beluga caviar",
                "quantity": 1,
                "pricePerItem": 9001
            }
        ];

        var alreadyBoughtItems = [];

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function () {
            return alreadyBoughtItems;
        }

        service.buyItem = function (index) {
            var item = toBuyItems[index];

            toBuyItems.splice(index, 1);
            alreadyBoughtItems.push(item);
        }
    }

    function TotalPriceInAngularDollarsFilter() {
        return function(price, quantity) {
            var totalPrice = price * quantity;
            return "$$$" + totalPrice.toFixed(2);    
        }
    }
})();

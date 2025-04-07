(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .directive('foundItems', FoundItemsDirective);

  function NarrowItDownController() {
    var scope = this;
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html'
    };

    return ddo;
  }
})();

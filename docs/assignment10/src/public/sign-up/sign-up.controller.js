(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['$q', 'MenuService'];
  function SignUpController($q, MenuService) {
    var $ctrl = this;

    $ctrl.user = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      favoriteMenuItem: ''
    }

    $ctrl.invalidFavoriteItem = false;
    $ctrl.submitted = false;

    $ctrl.submit = function () {
      $ctrl.submitted = false;

      $ctrl.validateFavoriteItem().then(function (menuItem) {
        if (menuItem !== null) {
          $ctrl.submitted = true;
        }
      });
    };

    $ctrl.validateFavoriteItem = function () {
      var deferred = $q.defer();

      const menuNumberPattern = /([a-zA-Z]+)(\d+)/
      var menuNumberMatch = $ctrl.user.favoriteMenuItem.match(menuNumberPattern);

      if (menuNumberMatch === null || menuNumberMatch.length != 3) {
        $ctrl.invalidFavoriteItem = true;

        deferred.resolve(null);
        return deferred.promise;
      }

      var category = menuNumberMatch[1];
      var id = menuNumberMatch[2];

      MenuService.getSpecificMenuItem(category, id).then(function (menuItem) {
        if (menuItem === null) {
          $ctrl.invalidFavoriteItem = true;

          deferred.resolve(null);
          return deferred.promise;
        }

        $ctrl.invalidFavoriteItem = false;
        deferred.resolve(menuItem);
      });

      return deferred.promise;
    };
  };

})();
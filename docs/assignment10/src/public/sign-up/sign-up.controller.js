(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['$q', 'MenuService', 'UserInfoService'];
  function SignUpController($q, MenuService, UserInfoService) {
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
          var userInfo = {
            firstName: $ctrl.user.firstName,
            lastName: $ctrl.user.lastName,
            email: $ctrl.user.email,
            phone: $ctrl.user.phone,
            favoriteMenuItem: menuItem
          };

          UserInfoService.saveUserInfo(userInfo);
          $ctrl.submitted = true;
        }
      });
    };

    $ctrl.validateFavoriteItem = function () {

      const menuNumberPattern = /([a-zA-Z]+)(\d+)/
      var menuNumberMatch = $ctrl.user.favoriteMenuItem.match(menuNumberPattern);

      if (menuNumberMatch === null || menuNumberMatch.length != 3) {
        $ctrl.invalidFavoriteItem = true;
        return $q.when(null);
      }

      var category = menuNumberMatch[1];

      var idComponent = menuNumberMatch[2];
      var idInt = parseInt(idComponent) - 1;
      var id = idInt.toString();

      var deferred = $q.defer();
      MenuService.getSpecificMenuItem(category, id).then(function (menuItem) {
        if (menuItem === null) {
          $ctrl.invalidFavoriteItem = true;
          deferred.resolve(null);
        } else {
          $ctrl.invalidFavoriteItem = false;
          deferred.resolve({ category: category, item: menuItem });
        }
      });

      return deferred.promise;
    };
  };

})();
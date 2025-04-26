(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService'];
  function SignUpController(MenuService) {
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

      const menuNumberPattern = /([a-zA-Z]+)(\d+)/
      var menuNumberMatch = $ctrl.user.favoriteMenuItem.match(menuNumberPattern);

      if (menuNumberMatch === null || menuNumberMatch.length != 3) {
        $ctrl.invalidFavoriteItem = true;
        return;
      }

      var category = menuNumberMatch[1];
      var id = menuNumberMatch[2];

      MenuService.getSpecificMenuItem(category, id).then(function (menu_item) {
        if (menu_item === null) {
          $ctrl.invalidFavoriteItem = true;
          return;
        }

        $ctrl.invalidFavoriteItem = false;
        $ctrl.submitted = true;
      });
    };
  }

})();
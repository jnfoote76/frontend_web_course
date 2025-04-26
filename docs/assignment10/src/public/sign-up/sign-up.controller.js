(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = [];
  function SignUpController() {
    var $ctrl = this;

    $ctrl.user = {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  }

})();
(function () {
  'use strict';

  angular.module('common')
    .service('UserInfoService', UserInfoService);

  UserInfoService.$inject = []
  function UserInfoService() {
    var service = this;

    service.user = null;

    service.getUserInfo = function () {
      return service.user;
    };

    service.saveUserInfo = function (user) {
      service.user = user;
    };
  }

})();

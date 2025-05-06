describe('sign-up', function () {
    var $httpBackend;
    var ApiPath;

    beforeEach(function () {
        module('public');
    });

    var $controller;
    var signUpController;
    var $httpBackend;
    var ApiPath;

    beforeEach(inject(function (_$controller_, $injector) {
        $controller = _$controller_;

        signUpController =
            $controller('SignUpController',
                {});

        $httpBackend = $injector.get('$httpBackend');
        ApiPath = $injector.get('ApiPath');
    }));

    it('should return object when menu item exists', function () {
        $httpBackend.whenGET(ApiPath + '/menu_items/ABC/menu_items/3.json').respond({ 'foo': 'bar' });

        signUpController.user.favoriteMenuItem = 'abc4';

        signUpController.validateFavoriteItem().then(function (result) {
            expect(result).toEqual({ category: 'ABC', item: { 'foo': 'bar' } });
            expect(signUpController.invalidFavoriteItem).toBe(false);
        });

        $httpBackend.flush();
    });

    it('should return null when favorite item does not match expected pattern (without any web request)', function () {
        signUpController.user.favoriteMenuItem = '45ABC';

        signUpController.validateFavoriteItem()
            .then(function (result) {
                expect(result).toEqual(null);
                expect(signUpController.invalidFavoriteItem).toBe(true);
            });

        try {
            $httpBackend.flush();
        } catch {
            // Ignore
        }
    });

    it('should return null when menu item does not exist', function () {
        $httpBackend.whenGET(ApiPath + '/menu_items/ABC/menu_items/3.json').respond(null);

        signUpController.user.favoriteMenuItem = 'abc4';

        signUpController.validateFavoriteItem().then(function (result) {
            expect(result).toEqual(null);
            expect(signUpController.invalidFavoriteItem).toBe(true);
        });

        $httpBackend.flush();
    });
});

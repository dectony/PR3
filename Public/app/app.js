var app = angular.module('app', ['ngResource', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    var routeRoleCheck = {
        admin: {
            auth: function (prAuth) {
                return prAuth.isUserAuthorizedForRoute('admin')
            }
        }
    }
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {templateUrl: '/partials/main/main', controller: 'prMainController'})
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list', controller: 'prAdminController',
            resolve: routeRoleCheck.admin
        })
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
})

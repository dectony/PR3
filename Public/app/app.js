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
        .when('/signup', {templateUrl: '/partials/account/signup', controller: 'prSignupController'})
        .when('/auctions', {templateUrl: '/partials/auction/auctions-list', controller: 'prAuctionController'})
        .when('/auction-add', {templateUrl: '/partials/auction/auction-add', controller: 'prAuctionController'})
        .when('/auction-update', {templateUrl: '/partials/auction/auction-update', controller: 'prAuctionController'})
        .when('/cars', {templateUrl: '/partials/car/cars-list', controller: 'prCarController'})
        .when('/caradding', {templateUrl: '/partials/car/car-add', controller: 'prCarController'})
        .when('/car-update', {templateUrl: '/partials/car/car-update', controller: 'prCarController'})
    
});

angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/');
        }
    })
})

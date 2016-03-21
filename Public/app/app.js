var app = angular.module('app',['ngResource','ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/',{templateUrl:'/partials/main', controller:'mainController'})
});

app.controller('mainController', function($scope){
    $scope.myVar = "Hello world angular";
})
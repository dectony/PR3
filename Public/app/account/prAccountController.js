angular.module('app').controller('prAccountController', function($scope){
    $scope.signIn  = function(username, password){
         console.log(username + " " + password);
    }
})
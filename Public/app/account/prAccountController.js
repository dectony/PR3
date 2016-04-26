angular.module('app').controller('prAccountController', function($scope, $http, prNotifier, prIdentity, prAuth){
    $scope.identity = prIdentity;
    $scope.signIn  = function(username, password){
        prAuth.authenticateUser(username,password).then(function(success){
            if(success){
                prNotifier.notifySuccess('You have successfully logged in!');
            }else{
                prNotifier.notifyFail('Username or password incorrect!');
            }
        });
    }
})
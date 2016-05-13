angular.module('app').controller('prAccountController', function($scope, $http, prNotifier, prIdentity, prAuth, $location){
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

    $scope.signOut  = function(){
        prAuth.logOutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            prNotifier.notifySuccess('You have successfully logged out!');
            $location.path('/');
        });
    }
})
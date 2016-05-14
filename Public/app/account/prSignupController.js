angular.module('app').controller('prSignupController', function ($scope, prUser, prNotifier, prAuth, $location) {
    $scope.signup = function () {
        var newUserData = {
            userName: $scope.email,
            password: $scope.password,
            firstName: $scope.firstname,
            lastName: $scope.lastname
        };

        prAuth.createUser(newUserData).then(function () {
            prNotifier.notifySuccess('User account creates successfully!');
            $location.path('/');
        }, function (reason){
            prNotifier.notifyError(reason);
        })
    }
})
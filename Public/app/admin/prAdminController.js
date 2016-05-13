angular.module('app').controller('prAdminController', function($scope, prUser, $http){
    $scope.users = prUser.query();

    // if($scope.users.length === 0){
    //     $http.get('/api/users').then(function(response){
    //         $scope.users = response.data;
    //     })
    // }
})
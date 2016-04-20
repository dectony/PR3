angular.module('app').controller('prAccountController', function($scope, $http){
    $scope.signIn  = function(username, password){
         $http.post('/login', {userName:username, password:password}).then(function(response){
             if(response.data.success){
                 console.log('logged in!');
             }else{
                 console.log('login failed!');
             }
         } )
    }
})
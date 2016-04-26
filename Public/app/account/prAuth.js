angular.module('app').factory('prAuth', function($http, prIdentity, $q){
    return{
        authenticateUser: function(username, password){
            var dfd = $q.defer();
            $http.post('/login', {username:username, password:password}).then(function(response){
                if(response.data.success){
                    prIdentity.currentUser = response.data.user;
                    dfd.resolve(true);
                }else{
                    prIdentity.currentUser = undefined;
                    dfd.resolve(false);
                }
            } );
            return dfd.promise;
        }
    }
})
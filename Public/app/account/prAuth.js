angular.module('app').factory('prAuth', function ($http, prIdentity, $q, prUser) {
    return {
        authenticateUser: function (username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password}).then(function (response) {
                if (response.data.success) {
                    var user = new prUser();
                    angular.extend(user, response.data.user);
                    prIdentity.currentUser = user;
                    dfd.resolve(true);
                } else {
                    prIdentity.currentUser = undefined;
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },

        createUser: function(newUserData){
            var newUser = new prUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function () {
                prIdentity.currentUser = newUser;
                dfd.resolve();
            },function (response) {
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },

        logOutUser: function () {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function (response) {
                prIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },

        isUserAuthorizedForRoute: function (role) {
            if (prIdentity.isAuthorized(role)) {
                return true;
            }
            else {
                return $q.reject('not authorized');
            }
        }
    }
})
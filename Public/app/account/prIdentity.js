angular.module('app').factory('prIdentity', function($window, prUser){
    var currentuser;
    if(!!$window.bootstrappedUserObject){
        currentuser = new prUser();
        angular.extend(currentuser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentuser,
        isAuthenticated: function(){
            return !!this.currentUser;
        },
        isAuthorized: function (role) {
            return this.isAuthenticated() && this.currentUser.roles.indexOf(role) > -1;
        }
    }
})
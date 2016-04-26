angular.module('app').factory('prIdentity', function(){
    return {
        currentUser: undefined,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
})
angular.module('app').factory('prUser', function($resource){
   var UserResource = $resource('/api/users/:id', {_id: "@id"},{query: {method:'GET',isArray:true}});

    UserResource.prototype.isAdmin = function(){
        return this.roles && this.roles.indexOf('admin') > -1;
    }

    return UserResource;
})
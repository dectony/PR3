angular.module('app').factory('prCar', function ($resource) {
    var CarResource = $resource('/api/cars/:id', {_id: "@id"}, {
        query: {method: 'GET', isArray: true},
        update: {method: 'PUT'},
        delete: {method: 'DELETE'}
    });
    
    return CarResource;
})
angular.module('app').factory('prBid', function ($resource) {
    var BidResource = $resource('/api/bids/:id', {_id: "@id"}, {
        query: {method: 'GET', isArray: true},
        update: {method: 'PUT'},
        delete: {method: 'DELETE'}
    });

    return BidResource;
})
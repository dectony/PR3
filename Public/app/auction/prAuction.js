angular.module('app').factory('prAuction', function ($resource) {
    var AuctionResource = $resource('/api/auctions/:id', {_id: "@id"}, {
        query: {method: 'GET', isArray: true},
        update: {method: 'PUT'},
        delete: {method: 'DELETE'}
    });

    return AuctionResource;
})
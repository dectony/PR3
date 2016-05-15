angular.module('app').controller('prAuctionController', function($scope, prAuction){
    $scope.auctions = prAuction.query();
})
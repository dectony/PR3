angular.module('app').controller('prDetailedAuctionController', function($scope, prAuction, $routeParams){
    if ($routeParams.id) {
        prAuction.get({id: $routeParams.id}).$promise.then(function (auction) {
            $scope.auction = auction;
        })
    }

    $scope.placeBid = function(){

    }
})
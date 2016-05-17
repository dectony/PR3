angular.module('app').controller('prDetailedAuctionController', function($scope, prAuction, $routeParams, prBid, prIdentity, prNotifier){
    $scope.newBidData = {
        bidValue: 0,
        bidPlaced: false
    }

    if ($routeParams.id) {
        prAuction.get({id: $routeParams.id}).$promise.then(function (auction) {
            $scope.auction = auction;
            prBid.get({id: $scope.auction._id}).$promise.then(function (bid) {
                $scope.bidValue = bid.bidValue;
                $scope.newBidData.bidPlaced = true;
            })
        })

    }




    $scope.placeBid = function(){
        var newBid = new prBid($scope.newBidData);
        newBid.user = prIdentity.currentUser;
        newBid.auction = $scope.auction;
        newBid.$save().then(function(){
            prNotifier.notifySuccess('Your bis was accepted');
            $scope.newBidData.bidPlaced = true;
        })
    }
})
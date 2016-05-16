angular.module('app').controller('prAuctionController', function ($scope, prAuction, prNotifier, prIdentity, $location,
                                                                  $routeParams, prCar, $interval) {

    $scope.cars = prCar.query();

    if ($routeParams.id) {
        prAuction.get({id: $routeParams.id}).$promise.then(function (auction) {
            $scope.auction = auction;
            prCar.get({id: auction.car}).$promise.then(function (car) {
                $scope.selected = car;
            });
        });
    } else {
        $scope.auctions = prAuction.query();
        $scope.auctions.$promise.then(function () {
            $interval(function () {
                angular.forEach($scope.auctions, function (value, key) {
                    console.log(value.finishDate);
                    if (moment().isAfter(value.finishDate)) {
                        value.duration = "finished";
                    } else {
                        value.duration = moment().countdown(value.finishDate).toString();
                    }
                });
            }, 1000);
        });

    }

    $scope.saveAuction = function () {
        var newAuctionData = $scope.auction;
        newAuctionData.user_id = prIdentity.currentUser._id;
        newAuctionData.finishDate = $scope.finishDate;

        var newAuction = new prAuction(newAuctionData);
        if (newAuctionData._id) {
            newAuctionData.car =  $scope.selected._id;
            prAuction.update({id: newAuctionData._id}, newAuctionData);
        } else {
            newAuction.$save().then(function () {
                prNotifier.notifySuccess('New auction was added!');
            }, function (response) {
                prNotifier.notifyFail('New auction was not added!');
            });
        }
    }

    $scope.updateAuction = function (auctionId) {
        $location.path('/auction-update/').search({id: auctionId});
    }

    $scope.deleteAuction = function (auction) {
        prAuction.delete({id: auction._id}, function (response) {
            if (response.status === 'OK') {
                var index = $scope.auctions.indexOf(auction);
                $scope.auctions.splice(auction, 1);
                prNotifier.notifySuccess('Auction was deleted!');
            } else {
                prNotifier.notifyFail('Auction was not deleted!');
            }
        });
    }


    angular.element(document).ready(function () {
        jQuery('#finishdate').datetimepicker();
        jQuery("#finishdate").on("dp.change", function () {
            $scope.finishDate = jQuery("#finishdate").val();
        });
    });
})
angular.module('app').controller('prMainController', function ($scope, prAuction, $interval) {
    $scope.auctions = prAuction.query();
    $scope.auctions.$promise.then(function () {
        $interval(function () {
            angular.forEach($scope.auctions, function (value, key) {
                //console.log(value.finishDate);
                if (moment().isAfter(value.finishDate)) {
                    value.duration = "finished";
                } else {
                    value.duration = moment().countdown(value.finishDate).toString();
                }
            });
        }, 1000);

        $scope.currentAuctions = $scope.auctions.filter(isCurrent);
        $scope.pastAuctions = $scope.auctions.filter(isPast);
    });

    function isCurrent(auction) {
        return moment().isBefore(auction.finishDate);
    }

    function isPast(auction) {
        return moment().isAfter(auction.finishDate);


    }

})
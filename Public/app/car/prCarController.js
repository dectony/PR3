angular.module('app').controller('prCarController', function ($scope, prCar, prNotifier, prIdentity, $location, $routeParams, Upload, $timeout) {
    if ($routeParams.id) {
        prCar.get({id: $routeParams.id}).$promise.then(function (car) {
            $scope.car = car;
        });
    } else {
        $scope.cars = prCar.query();
    }
    $scope.saveCar = function () {
        var newCarData = $scope.car;
        newCarData.user_id = prIdentity.currentUser._id;
        var newCar = new prCar(newCarData);
        if (newCarData._id) {
            prCar.update({id: newCarData._id}, newCarData);
            //newCar.update();
        } else {
            newCar.$save().then(function () {
                prNotifier.notifySuccess('New car was added!');
            }, function (response) {
                prNotifier.notifyFail('New car was not added!');
            });
        }
    }

    $scope.updateCar = function (carId) {
        $location.path('/car-update/').search({id: carId});
    }

    $scope.deleteCar = function (car) {
        prCar.delete({id: car._id}, function (response) {
            if (response.status === 'OK') {
                var index = $scope.cars.indexOf(car);
                $scope.cars.splice(car, 1);
                prNotifier.notifySuccess('Car was deleted!');
            } else {
                prNotifier.notifyFail('Car was not deleted!');
            }
        });
    }

    $scope.uploadFiles = function (files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function (file) {
            file.upload = Upload.upload({
                url: '/api/upload/',
                arrayKey: '',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        });
    }

})
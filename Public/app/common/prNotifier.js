angular.module('app').value('prToastr', toastr);

angular.module('app').factory('prNotifier', function(prToastr){
    return {
        notifySuccess: function(msg){
            prToastr.success(msg);
            console.log(msg);
        },
        notifyFail: function(msg){
            prToastr.warning(msg);
            console.log(msg);
        }
    }
})
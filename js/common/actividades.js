angular.module('app').
controller('activityCtrl', function($scope, $uibModal) {
	$scope.displayImage = function(image) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/templates/angular/app/dialogs/imageViewer.html',
			controller: 'imageViewerCtrl',
			size: 'lg',
			resolve: {
				image: function() {
					return { url: image	}
				}
			}
	    })
		modalInstance.result.then(function(result) {
	    })
	}
}).
controller('imageViewerCtrl', function($scope, $http, $uibModalInstance, image) {
	$scope.image = image.url

	$scope.ok = function() {
		$uibModalInstance.close('ok')
	}

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel')
	}
})
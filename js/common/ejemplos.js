angular.module('app').
controller('ejemplosCtrl', function($scope, $uibModal) {
	$scope.samples = []
	$scope.displaySample = function(sampleIndex) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/templates/angular/app/dialogs/ejemplosDialog.html',
			controller: 'ejemplosDialogCtrl',
			size: 'lg',
			resolve: {
				sample: function() {
					return {
						samples: $scope.samples,
						index: sampleIndex
					}
				}
			}
	    })
		modalInstance.result.then(function(result) {
	    })
	}
}).
controller('ejemplosDialogCtrl', function($scope, $http, $uibModalInstance, sample) {
	$scope.samples = sample.samples
	$scope.index = sample.index
	$scope.sample = $scope.samples[$scope.index]

	$scope.$watch('index', function() {
		$scope.sample = $scope.samples[$scope.index]
	})
	$scope.next = function() {
		if ($scope.index < $scope.samples.length - 1)		
			$scope.index++
	}
	$scope.prev = function() {
		if ($scope.index > 0)
			$scope.index--
	}

	$scope.ok = function() {
		$uibModalInstance.close('ok')
	}

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel')
	}
}).
directive('deSample', function() {
	return {
		scope: true,
		controller: function($scope, $element, $attrs) {
			var sample = {}
			this.getSample = function() {
				return sample
			}
			this.setSampleDesc = function(desc) {
				sample.desc = desc
			}
			this.setSampleImage = function(image) {
				sample.image = image
			}
		},
//		template: '<div style="border:1px solid #e4e4e4;width:100px;"><p>{{title}}</p></div>',
		link: function($scope, $element, $attrs, $sampleCtrl) {
			var sample = $sampleCtrl.getSample()
			sample.index = $scope.samples.length
			$scope.samples.push(sample)
		}
	}
}).
directive('deSampleImg', function() {
	return {
		require: '^deSample',
//		template: '<img ng-src="{{image}}" style="position:relative;width:100%;height:180px;overflow:hidden; max-width:100%;height:auto;vertical-align:middle;" />',
		template: '<div style="position:relative;width:100%;height:180px;overflow:hidden;background-position:top center;background-size:cover;background-repeat:no-repeat;background-image:url(\'{{image}}\');"></div>',
		link: function($scope, $element, $attrs, $sampleCtrl) {
			$scope.image = $attrs['deSampleImg'] + '=s250'
			$sampleCtrl.setSampleImage($attrs['deSampleImg'])
		}
	}
}).
directive('deSampleDesc', function() {
	return {
		require: '^deSample',
		link: function($scope, $element, $attrs, $sampleCtrl) {
			$sampleCtrl.setSampleDesc($element.html())
		}
	}
})
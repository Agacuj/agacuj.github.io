angular.module('app').
controller('consumidorCtrl', function($scope, $uibModal) {
	$scope.asked = false
	$scope.displayInterview = function() {
		if ($scope.asked)
			return

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'templates/angular/app/dialogs/consumidorDialog.html',
			controller: 'consumidorDialogCtrl'
	    })
		modalInstance.result.then(function(result) {
			// result is 'ok'
			$scope.asked = true
	    })
	}
}).
controller('consumidorDialogCtrl', function($scope, $http, $uibModalInstance) {

	$scope.verify = {	
		key: '6LeiRBUTAAAAAOVpweqRt0vM2nDQgSYwRHGajxn3',
		setResponse: function (response) {
	        $scope.verify.response = response
	    },
	    setWidgetId: function (widgetId) {
	        $scope.widgetId = widgetId
	    },
	    cbExpiration: function() {
	        console.info('Captcha expired. Resetting response object')
	        $scope.verify.response = null
	     }
	}
	
	$scope.ok = function() {
		if (!$scope.name) {
			alert('Es necesario indicar el nombre de quien envía la pregunta.')
			return
		}
		if (!$scope.email) {
			alert('Para poder responder necesitamos un correo electrónico válido.')
			return
		}
		if (!$scope.quest) {
			alert('Debe introducir un texto en la pregunta.')
			return
		}
		$scope.busy = true
		$http({
            method: 'post',
            url: '/rest/app/pregunta',
            data : {
            	name: $scope.name,
            	email: $scope.email,
            	quest: $scope.quest,
            	answer: '',
            	verify: $scope.verify.response
            },
            headers: { enctype: 'application/x-www-form-urlencoded' }
		}).
		success(function(data, status, headers, config) {
			$scope.busy = false
			$uibModalInstance.close('ok')
		}).
		error(function(data, status, headers, config) {
			$scope.error = 'Ha habido un error'
		})
	}

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel')
	}

	$scope.closeError = function() {
		$scope.error = undefined
		$scope.busy = false
	}
}).
directive('deScrollTop', function($window) {
	return {
		scope: {},
		link: function($scope, $element, $attrs) {
			var e = $element[0]
			$scope.top = -51
			while (e) {
				$scope.top += e.offsetTop
				e = e.offsetParent
			}
			console.log($scope.top)

			$scope.windowEl = angular.element($window);
		    var handler = function() {
				if ($scope.windowEl[0].scrollY >= $scope.top)
					$element.addClass('fixed')
				else
					$element.removeClass('fixed')
				console.log($scope.windowEl[0].scrollY)
      		}
      		$scope.windowEl.on('scroll', $scope.$apply.bind($scope, handler))
      		handler()
		}
	}
})
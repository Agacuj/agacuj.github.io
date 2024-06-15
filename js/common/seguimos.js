angular.module('app').
controller('seguimosCtrl', function($scope, $uibModal) {

	$scope.gooned = false
	$scope.state = 0
	$scope.displayDialog = function() {
		if ($scope.state == 200)
			return

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'templates/angular/app/dialogs/seguimosDialog.html',
			controller: 'seguimosDialogCtrl'
	    })
		modalInstance.result.then(function(result) {
			$scope.gooned = true
			$scope.state = 200
	    })
	}
}).
controller('seguimosDialogCtrl', function($scope, $http, $uibModalInstance) {

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
		$scope.busy = true
		$scope.sendGoon(function(result) {
			if (result) {
				$scope.busy = false
				$uibModalInstance.close('ok')
			}
			else {
				$scope.error = 'Ha habido un error'
			}
		})
	}

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel')
	}

	$scope.sendGoon = function(callback) {
		if (!$scope.name) {
			alert('Es necesario indicar el nombre de quien envía la pregunta.')
			return
		}
		if (!$scope.email) {
			alert('Para poder publicar tu SEGUIMOS necesitamos un correo electrónico válido.')
			return
		}
		if (!$scope.text) {
			alert('Debe introducir un texto.')
			return
		}
		$http({
            method: 'post',
            url: '/rest/app/seguimos/on',
            data : {
            	name: $scope.name,
            	email: $scope.email,
            	text: $scope.text,
            	verify: $scope.verify.response
            },
            headers: { enctype: 'application/x-www-form-urlencoded' }
		}).
		success(function(data, status, headers, config) {
			callback(true)
		}).
		error(function(data, status, headers, config) {
			vcRecaptchaService.reload($scope.widgetId)
			callback(false)
		})
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
//				$element[0].style.top = ($scope.windowEl[0].scrollY + 51) + 'px'
				console.log($scope.windowEl[0].scrollY)
      		}
      		$scope.windowEl.on('scroll', $scope.$apply.bind($scope, handler))
      		handler()
/*      		
			$scope.top = $element[0].offsetTop
			$window.onscroll = function(e) {
				var ypos = angular.element($window).scrollTop()
				console.log(ypos)
				if (ypos >= $scope.top) {
					$element.addClass('fixed')
				}
				else {
					$element.removeClass('fixed')
				}
			}
*/			
		}
	}
})
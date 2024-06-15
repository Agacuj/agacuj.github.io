angular.module('app').
controller('sersocioCtrl', function($scope, $http, $uibModal) {
	$scope.result = null;
	$scope.busy = false

	$scope.sections = [
		{ id: 'AAA', text: 'Asalariad@s y personas autónomas que se dediquen al sector de la alimentación - charcuterías.' },
		{ id: 'AAH', text: 'Asalariad@s y personas autónomas que se dediquen al sector de la hostelería.'},
		{ id: 'C', text: 'Cortador@s de jamón que cortan asiduamente en su lugar de trabajo o eventos.' },
		{ id: 'DE', text: 'Distribuidor@s y empresari@s del sector jamonero.' },
		{ id: 'CSA', text: 'Consumidor@s, colaborador@s, simpatizantes y “Aficionad@s al mundo del jamón y la paleta”.' }
	];
	
	$scope.displayDoc = function (doc) {
		var modalInstance = $uibModal.open({
			size: 'lg',
			animation: true,
			templateUrl: 'templates/angular/app/docs/' + doc + '.html',
			controller: 'docDialogCtrl'
	    })
	}
	
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
	
	$scope.submit = function() {
		$scope.error = {};
		
		if (!$scope.readed)
			$scope.error.readed = 'Debes indicar que aceptas el acuerdo...'
		if (!$scope.name || $scope.name.length == 0)
			$scope.error.name = 'Debes indicar tu nombre.'
		if (!$scope.dni || $scope.dni.length == 0)
			$scope.error.dni = 'Debes indicar D.N.I. o N.I.F.'
		if (!$scope.email || $scope.email.length == 0)
			$scope.error.email = 'Debes indicar tu correo electrónico.'
		if (!$scope.dir || $scope.dir.length == 0)
			$scope.error.dir = 'Debes indicar tu dirección.'
		if (!$scope.pob || $scope.pob.length == 0)
			$scope.error.pob = 'Debes indicar Población.'
		if (!$scope.prov || $scope.prov.length == 0)
			$scope.error.prov = 'Debes indicar Provincia.'
		if (!$scope.cp || $scope.cp.length == 0)
			$scope.error.cp = 'Debes indicar Código Postal.'
		if (!$scope.pais || $scope.pais.length == 0)
			$scope.error.pais = 'Debes indicar Pais.'
		if (!$scope.phone1 || $scope.phone1.length == 0)
			$scope.error.phone1 = 'Debes indicar un teléfono.'

		var selected = 0;
		var sections = [];
		if ($scope.selectedSections)
			for(var i = 0; i < 5; i++)
				if ($scope.selectedSections[i] === true)
					sections.push($scope.sections[i].id)

		if (sections.length == 0 || sections.length > 2)
			$scope.error.sections = 'Debes indicar una o dos secciones.'

		if (Object.keys($scope.error).length > 0)
			return;

		if ($scope.verify.response == null) {
			alert('Demuestra que eres una persona rellenando el CAPTCHA.')
			return
		}
		
		$scope.busy = true;

        $http({
            method: 'post',
            url: '/rest/app/sersocio_nuevo',
            data : {
            	accept: $scope.accept,
            	name: $scope.name,
            	dni: $scope.dni,
            	email: $scope.email,
            	dir: $scope.dir,
            	pob: $scope.pob,
				prov: $scope.prov,
				cp: $scope.cp,
            	phone1: $scope.phone1,
            	phone2: $scope.phone2,
            	sections: sections,
            	whatsapp: $scope.whatsapp,
            	verify: $scope.verify.response
            }
    	}).
		success(function(data, status, headers, config) {
			// data = { error: 'error', result: true }
			if (data.error)
				$scope.result = data.error;
			else
				$scope.result = 'Hemos registrado tu solicitud y te hemos enviado un correo a la dirección que nos has indicado, por favor, revísalo (incluyendo el "correo no deseado") para comprobar que dicho correo es correcto. Desde AGACUJ te damos las gracias por tu interés y por querer formar parte de este proyecto.';
			
			var modalInstance = $uibModal.open({
				size: 'lg',
				animation: true,
				templateUrl: 'templates/angular/app/sersocio/confirmacion.html',
				controller: 'docDialogCtrl'
		    })
			
		}).
		error(function(data, status, headers, config) {
		})
	}
}).
controller('docDialogCtrl', function($scope, $interval, $http, $uibModalInstance) {
	$scope.close = function () {
		$uibModalInstance.close();
	}
})
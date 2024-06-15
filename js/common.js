angular.module('app', ['ngCookies', 'ui.bootstrap', 'vcRecaptcha']).
controller('mainCtrl', function($scope, $cookies) {
	$scope.appMenu = { collapsed: true }
	$scope.agacuj_aviso = false
	if ($cookies.get('agacuj_aviso') != 'true') {
		// activar aviso
		$scope.agacuj_aviso = true
	}

    var now = new Date().getTime()
    var then = new Date(now + (365 * 24 * 60 * 60 * 1000))
    $cookies.put(
    	'agacuj_aviso',
    	'true',
    	{
    		path: '/',
    		expires: then
    	}
    )
})
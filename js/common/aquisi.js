angular.module('app').
controller('aquisiCtrl', function($scope, $http, $uibModal, Map) {
    $scope.busy = true
	$scope.places = []
    $scope.map = true
    $scope.provs = [
        {name:'Todas', lat:40.0169954, lng:-3.9132276, z:5},
        {name:'Álava', lat:42.9099989, lng:-2.6983868, z:8},
        {name:'Albacete', lat:38.994349, lng:-1.8585424, z:8},
        {name:'Alicante', lat:38.3459963, lng:-0.4906855, z:8},
        {name:'Almería', lat:36.834047, lng:-2.4637136, z:8},
        {name:'Asturias', lat:43.3613953, lng:-5.8593267, z:8},
        {name:'Ávila', lat:40.656685, lng:-4.6812086, z:8},

        {name:'Badajoz', lat:38.8794495, lng:-6.9706535, z:8},
        {name:'Barcelona', lat:41.3850639, lng:2.1734035, z:8},
        {name:'Burgos', lat:42.3439925, lng:-3.696906, z:8},

        {name:'Cáceres', lat:39.4752765, lng:-6.3724247, z:8},
        {name:'Cádiz', lat:36.5270612, lng:-6.2885962, z:8},
        {name:'Cantabria', lat:43.1828396, lng:-3.9878427, z:8},
        {name:'Castellón', lat:40.1451772, lng:-0.1494988, z:8},
        {name:'Ceuta', lat:35.8893874, lng:-5.3213455, z:12},
        {name:'Ciudad Real', lat:38.9848295, lng:-3.927377799999999, z:8},
        {name:'Córdoba', lat:37.8881751, lng:-4.7793835, z:8},
        {name:'La Coruña', lat:43.3623436, lng:-8.4115401, z:8},
        {name:'Cuenca', lat:40.0703925, lng:-2.1374162, z:8},

        {name:'Gerona', lat:41.9794005, lng:2.8214264, z:8},
        {name:'Granada', lat:37.1773363, lng:-3.5985571, z:8},
        {name:'Guadalajara', lat:40.632489, lng:-3.16017, z:8},
        {name:'Guipúzcoa', lat:43.0756299, lng:-2.2236667, z: 8},

        {name:'Huelva', lat:37.261421, lng:-6.9447224, z:8},
        {name:'Huesca', lat:42.131845, lng:-0.4078058, z:8},

        {name:'Islas Baleares', lat:39.5341789, lng:2.8577105, z:8},

        {name:'Jaén', lat:37.7795941, lng:-3.784905699999999, z:8},

        {name:'Lleida', lat:41.6175899, lng:0.6200146, z:8},
        {name:'León', lat:42.5987263, lng:-5.5670959, z:8},
        {name:'Lugo', lat:43.0097384, lng:-7.5567582, z:8},

        {name:'Madrid', lat:40.4167754, lng:-3.7037902, z:8},
        {name:'Málaga', lat:36.721261, lng:-4.4212655, z:8},
        {name:'Melilla', lat:35.2922775, lng:-2.9380973, z:12},
        {name:'Murcia', lat:37.9922399, lng:-1.1306544, z:8},

        {name:'Navarra', lat:42.6953909, lng:-1.6760691, z:8},

        {name:'Ourense', lat:42.33578929999999, lng:-7.863880999999998, z:8},

        {name:'Palencia', lat:42.0096857, lng:-4.5288016, z:8},
        {name:'Las Palmas', lat:28.1235459, lng:-15.4362574, z:8},
        {name:'Pontevedra', lat:42.4298846, lng:-8.6446202, z:8},

        {name:'La Rioja', lat:42.2870733, lng:-2.539603, z:8},

        {name:'Salamanca', lat:40.9515263, lng:-6.2375947, z:8},
        {name:'Segovia', lat:40.9429032, lng:-4.108806899999999, z:8},
        {name:'Sevilla', lat:37.3890924, lng:-5.9844589, z:8},
        {name:'Soria', lat:41.7665972, lng:-2.4790306, z:8},

        {name:'Tarragona', lat:41.1188827, lng:1.2444909, z:8},
        {name:'Santa Cruz de Tenerife', lat:28.4636296, lng:-16.25486, z:8},
        {name:'Teruel', lat:40.3456879, lng:-1.1064345, z:8},
        {name:'Toledo', lat:39.8628316, lng:-4.027323099999999, z:8},

        {name:'Valencia', lat:39.4699075, lng:-0.3762881, z:8},
        {name:'Valladolid', lat:41.652251, lng:-4.724532099999999, z:8},
        {name:'Vizcaya', lat:43.2204286, lng:-2.6983868, z:8},

        {name:'Zamora', lat:41.5034712, lng:-5.7467879, z:8},
        {name:'Zaragoza', lat:41.6488226, lng:-0.8890853, z:8}
    ]
    $scope.selectProv = 'Todas'
    $scope.$watch('selectProv', function() {
        for (var i = 0; i < $scope.provs.length; i++)
            if ($scope.provs[i].name == $scope.selectProv)
                Map.get().locate($scope.provs[i].lat, $scope.provs[i].lng, $scope.provs[i].z)
        var prov = ($scope.selectProv == 'Todas') ? '*' : $scope.selectProv
        $scope.loadPlaces(prov)
    })

    $scope.displayMap = function(map) {
        $scope.map = !map
        if ($scope.map)
            Map.get().displayMap()
    }

    $scope.locatePlace = function(place) {
        if (!$scope.map) {
            $scope.map = true
            Map.get().displayMap()
        }
        Map.get().locatePlace(place)
    }

    $scope.loadPlaces = function(prov) {
        $scope.busy = true
        $http({
            method: 'get',
            url: '/rest/app/aquisi/' + prov
        }).
        success(function(data, status, headers, config) {
            $scope.places = []

            if (data.places) {
                var places = data.places
                var map = Map.get()
                for (var i = 0; i < places.length; i++) {
                    places[i].marker = map.setPlaceMarker(places[i])
                    $scope.places.push(places[i])
                }
            }

            $scope.busy = false
        }).
        error(function(data, status, headers, config) {
        })
    }

    $scope.displayPlace = function(place) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: '/templates/angular/app/dialogs/placeDialog.html',
            controller: 'placeDialogCtrl',
            size: 'lg',
            resolve: {
                place: function() {
                    return { place: place }
                }
            }
        })
        modalInstance.result.then(function(result) {
        })
    }
}).
controller('placeDialogCtrl', function($scope, $http, $uibModalInstance, place) {
	$scope.place = place.place

	$scope.ok = function() {
		$uibModalInstance.close('ok')
	}

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel')
	}
}).
directive('myMap', function(Map) {
    // directive link function
    var link = function(scope, element, attrs) {
        
        // map config
        var mapOptions = {
            center: new google.maps.LatLng(40.0169954,-3.9132276),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true //false
        }
        
        // show the map and place some markers
        Map.init(element[0], mapOptions);
    }
    
    return {
        restrict: 'A',
        template: '<div id="gmaps"></div>',
        replace: true,
        link: link
    }
}).
factory('Map', function($interval) {
	var Map = function() {
        var map, infoWindow
        var markers = []

        // init the map
		this.init = function(element, options) {
            if (map === void 0)
                map = new google.maps.Map(element, options)
            return this
		}
        this.displayMap = function() {
            $interval(function() {
                google.maps.event.trigger(map, 'resize')
            }, 1000, 1)
        }
        this.locate = function(lat, lng, zoom) {
            map.setCenter({lat: lat, lng: lng})
            map.setZoom(zoom)
        }
        this.locatePlace = function(place, zoom) {
            map.setZoom(17)
            map.setCenter({lat: place.loc.lat, lng: place.loc.lng})
            displayWindow(
//                '<div><h3>' + place.name + '</h3><p>' + place.desc + '</p></div>',
                '<div><h4>' + place.name + '</h4></div>',
                place.marker)
        }
		this.get = function() {
			return this
		}
        // place a marker
        this.setPlaceMarker = function(place) {
            var marker;
            var markerOptions = {
                position: new google.maps.LatLng(place.loc.lat, place.loc.lng),
                map: map,
                title: place.name,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            }

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker) // add marker to array
            
            google.maps.event.addListener(marker, 'click', function () {
                displayWindow('<div><h4>' + place.name + '</h4></div>', marker)
            });
            return marker
        }

        function displayWindow(content, marker) {
            // close window if not undefined
            if (infoWindow !== void 0) {
                infoWindow.close()
            }
            // create new window
            var infoWindowOptions = {
                content: content
            }
            infoWindow = new google.maps.InfoWindow(infoWindowOptions);
            infoWindow.open(map, marker);
        }
	}
    return new Map()
}).
directive('deScrollTop', function($window) {
    return {
        scope: {},
        link: function($scope, $element, $attrs) {
            $scope.minWidth = 0
            if ($attrs['minWidth'])
                $scope.minWidth = $attrs['minWidth']

            var e = $element[0]
            $scope.top = -51
            while (e) {
                $scope.top += e.offsetTop
                e = e.offsetParent
            }
            console.log($scope.top)

            $scope.windowEl = angular.element($window);
            var handler = function() {
                if ((!$element.hasClass('map') || $scope.windowEl[0].innerWidth > $scope.minWidth)
                    &&
                    $scope.windowEl[0].scrollY >= $scope.top)
                {
                    $element.addClass('fixed')
                }
                else
                    $element.removeClass('fixed')
                console.log($scope.windowEl[0].scrollY)
            }
            $scope.windowEl.on('scroll', $scope.$apply.bind($scope, handler))
            handler()
        }
    }
})
angular.module('app').
controller('videosCtrl', function($scope, $http, $uibModal) {
	$scope.videos = []
    $http.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PL6oDZvwTImWg8c9ZWOXFZcP6c5GimdO7p&key=AIzaSyCA8XuGlIOJkgwGIMjVIk05hIP8BAfOazo").
    success(function (data, status, headers, config) {
        if (data && data.kind === 'youtube#playlistItemListResponse') {
        	data.items.forEach(function (video) {
        		$scope.videos.push({
        			id: video.snippet.resourceId.videoId,
        			title: video.snippet.title,
        			description: video.snippet.description,
        			image: video.snippet.thumbnails.medium.url
        		})
        	})
        }
        else
            alert('none')
    }).
    error(function (data, status, headers, config) {
        alert('failed!')
    })
    
	$scope.displayVideo = function(video) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/templates/angular/app/dialogs/videoViewer.html',
			controller: 'videoViewerCtrl',
			size: 'lg',
			resolve: {
				video: function() {
					return { id: video	}
				}
			}
	    })
		modalInstance.result.then(function(result) {
	    })
	}
}).
controller('videoViewerCtrl', function($scope, $http, $uibModalInstance, $sce, video) {
	$scope.video = $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + video.id + '?autoplay=1&rel=0')

	$scope.ok = function() {
		$uibModalInstance.close('ok')
	}

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel')
	}
})

module.controller("profileViewController", function($localStorage, $scope, $http, profilesService) {
	if($localStorage.selectedProfile == null) {
		$http.get("http://att-bf22-test.apigee.net/baas/profiles/" + $localStorage.profileUuid)
		.success(function (response) {
			$localStorage.selectedProfile = response.entities[0];
			$scope.profile = $localStorage.selectedProfile;
			})
		} else {
				$scope.profile = $localStorage.selectedProfile;
		}
	
	$scope.timeIntervalItems = [
		{ id:'min', name:'minute'},
		{ id:'hour', name:'hour'},
		{ id:'day', name:'day'},
		{ id:'month', name:'month'}
	];
	
	$scope.showProxy = function(index) {
		var profile = $localStorage.selectedProfile;
		$localStorage.selectedProxy = profile.APIProxy[index];
		$localStorage.proxyIndex = index;
	}
	
	$scope.saveProfile = function() {
		$http.put("http://att-bf22-test.apigee.net/baas/profiles/" + $localStorage.profileUuid, $localStorage.selectedProfile)
		.success(function(response){
			bootbox.dialog({
				message: "Successfully saved profile", 
				onEscape: function() {
					window.location = "#/home";
				},
				closeButton: true,
				animate: true,
				buttons: {
					success: {
						label: "Ok",
						callback: function() {
							window.location = "#/home";
						}
					}
				}
			});
		})
	};
	
});
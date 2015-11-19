
module.controller('profilesListViewController', function($localStorage, $scope, $http, profilesService) {
    $http.get("http://att-bf22-test.apigee.net/baas/profiles")
    .success(function (response) {
		$scope.entities = response.entities;
		});
	$localStorage.selectedProfile = null;
	$localStorage.selectedProxy = null;
	$scope.showProfile = function(uuid){
		$localStorage.profileUuid = uuid;
		//profilesService.setUuid(uuid);
	}
});
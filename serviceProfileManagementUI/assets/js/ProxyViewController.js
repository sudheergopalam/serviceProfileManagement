module.controller('proxyViewController', function($scope, $localStorage, $window, $location){
	$scope.proxy = JSON.parse(JSON.stringify($localStorage.selectedProxy));
	
	var tags = [];
	var fields = [];
	for(var i = 0; i < $scope.proxy.Resources.length; i++) {
		var verbs = $scope.proxy.Resources[i].verbs;
		if(verbs && verbs.length > 0) {
			var splitted = verbs.split(',');
			var a = [];
			for(var j = 0; j < splitted.length; j++){
				var tag = {
					text: splitted[j]
				}
				a.push(tag);
			}
			tags.push(a);
		}
		fields.push(JSON.stringify($scope.proxy.Resources[i].Fields, null, "\t"));
	}
	$scope.fields = fields;
	$scope.tags = JSON.parse(JSON.stringify(tags));
	
	$scope.profileName = $localStorage.selectedProfile.DisplayName;
	$scope.saveProxy = function() {
		$localStorage.selectedProfile.APIProxy[$localStorage.proxyIndex] = $scope.proxy;
		window.location = "#/viewProfile";
	};
	
	var methods = ['POST','GET','PUT','TRACE','DELETE','OPTIONS','HEAD','PATCH'];
	$scope.loadMethods = function(chosen, query) {
		var res = extractStillAvailables(chosen);
		var resJson = [];
		if(res.length > 0 && query) {
			for(var i = 0; i < res.length; i++) {
				if(res[i].toUpperCase().indexOf(query.toUpperCase()) != -1) {
					resJson.push({text: res[i]});
				}
			}
		}
		return JSON.parse(JSON.stringify(resJson));
	};
	
	$scope.addedTag = function(chosenTags, index) {
		setVerbs(chosenTags, index);
	}
	
	$scope.removedTag = function(chosenTags, index) {
		setVerbs(chosenTags, index);
	}
	
	function setVerbs(chosenTags, index){
		var verbs = "";
		if(chosenTags && chosenTags.length > 0) {
			for(var i = 0; i < chosenTags.length; i++){
				verbs += chosenTags[i].text;
				if(i < chosenTags.length -1) {
					verbs += ",";
				}
			}
		}
		$scope.proxy.Resources[index].verbs = verbs;
	}
	
	function extractStillAvailables(chosen) {
		var res = methods.slice();
		if(chosen && chosen.length > 0) {
			for(var i = 0; i < res.length; i++) {
				if(present(chosen, res[i])) {
					res.splice(i, 1);
				}
			}
		}
		return res;
		
	};
	
	function present(chosen, method){
		for (var i = 0; i < chosen.length; i++) {
			if(chosen[i].text == method) return true;
		}
		return false;
	};
	
	$scope.changedJson = function(idx) {
		var string = $scope.fields[idx];
		try{
			var json = JSON.parse(string);
			$scope.proxy.Resources[idx].Fields = json;
		} catch(err) {
			
		}
	}
	
	// hack done to provide tab functionality despite of ng-route mechanism..
	$scope.selectedTab = 1;
});
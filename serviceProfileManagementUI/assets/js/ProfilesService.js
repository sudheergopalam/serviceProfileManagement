module.service("profilesService", function () {
	var uuid = '';
	this.setUuid = function(uuid) {
		this.uuid = uuid;
	};
	
	this.getUuid = function() {
		return this.uuid;
	};
	
	var selectedProfile = '';
	this.setSelectedProfile = function(profile) {
		this.selectedProfile = profile;
	};
	this.getSelectedProfile = function() {
		return this.selectedProfile;
	};
	
	var selectedProxy = '';
	this.setSelectedProxy = function(proxy) {
		this.selectedProxy = proxy;
	};
	this.getSelectedProxy = function() {
		return this.selectedProxy;
	};
});
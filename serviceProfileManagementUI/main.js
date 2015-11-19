
var module = angular.module("profilesRequester", ['ngRoute', 'ngStorage', 'ngTagsInput']);

module.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'ProfilesListView.html',
            controller: 'profilesListViewController'
        })
        .when('/viewProfile', {
            templateUrl: 'ProfileView.html',
            controller: 'profileViewController'
        })
		.when('/viewProxy', {
            templateUrl: 'ProxyView.html',
            controller: 'proxyViewController',
			reloadOnSearch: false
        })
        .otherwise({
            redirectTo: '/home'
        });
});

module.directive('jsonText', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {  
			var text = null;
          function into(input) {
            return JSON.parse(input);
          }
          function out(data) {
            return data;
          }
          //ngModel.$parsers.push(into);
          ngModel.$formatters.push(out);

        }
    };
});
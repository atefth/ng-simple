angular
.module('demo', ['ngSimple'])
.controller('DemoCtrl', ['$scope', function ($scope) {

	// multiselect dropdown
	$scope.filtered_status = [];
	$scope.updateStatuses = function () {
		console.log('ctrl', $scope.filtered_status);
	}
	
	// draggable toggle
	$scope.toggleModel = false;
	$scope.doSomething = function () {
		console.log('ctrl', $scope.toggleModel);
	}

	// dual progress bar
	$scope.min = 0;
	$scope.max = 60;
	$scope.status = 'initiated';
	$scope.score = 0;
	$scope.statuses = [{label: 'Initiated', value: 'initiated', order: 0, color: 'gray'}, {label: 'Validated', value: 'validated', order: 1, color: '#D91'}, {label: 'Approved', value: 'approved', order: 2, color: '#4cae4c'}];
	$scope.extraStatuses = [{label: 'Re-Validation Required', value: 'revalidation_required', order: 3, color: 'red'}]

}])

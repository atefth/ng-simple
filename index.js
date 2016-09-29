angular
.module('demo', ['ngSimple', 'ui.bootstrap', 'ngSanitize'])
.controller('DemoCtrl', ['$scope', function ($scope) {

	// multiselect dropdown
	$scope.options = [
		{label: 'Not Multiselectable', value: 1, multiselectable: false},
		{label: 'Multiselectable Option 1', value: 2},
		{label: 'Multiselectable Option 2', value: 3},
		{label: 'Multiselectable Option 3', value: 4}
	];
	$scope.filtered_status = [];
	$scope.updateStatuses = function () {
		console.log('ctrl', $scope.filtered_status);
	}

	// draggable toggle
	$scope.toggleModel = false;
	$scope.onColor = '#2196F3';
	$scope.offColor = '#848484';
	$scope.doSomething = function () {
		console.log('ctrl', $scope.toggleModel);
	}

	// dual progress bar
	$scope.min = 0;
	$scope.max = 60;
	$scope.status = '1';
	$scope.score = 0;
	$scope.statuses = [
		{label: 'State 1', value: '1', order: 0, color: '#848484'},
		{label: 'State 2', value: '2', order: 1, color: '#d19a3a'},
		{label: 'State 3', value: '3', order: 2, color: '#4cae4c'},
		{label: 'State 4', value: '4', order: 3, color: '#fcff48'}
	];
	$scope.extraStatuses = [
		{label: 'State 5', value: '5', order: 4, color: '#e33c34'},
		{label: 'State 6', value: '6', order: 5, color: '#d45cff'}
	];
	$scope.setStatus = function (status) {
		$scope.status = status.value;
	};
	$scope.setExtraStatus = function (status) {
		$scope.status = status.value;
	};

}])

angular
.module('ngSimple')
.directive('ngSimpleMultiselectDropdown', [function () {
	return {
		restrict: 'EA',
		// require: 'ngModel',
		scope: {
			// models
      options: '=',
      output: '=ngModel',
      // settings based on attribute
      disabled: '=',
      // callbacks
      onItemClick: '&',
      onOpen: '&',
      ngChange: '&',
		},
		templateUrl: '../templates/simple-multiselect-dropdown.html',
		link: function (scope, element, attrs) {
			var disabledStyle = '{}';
			var text = 'Select';
			scope.dropdownText = text;
			if (scope.disabled) {
				disabledStyle = "{opacity: 0.5}";
			}
			scope.updateList = function (option) {
				if (!scope.disabled) {
					var found = false;
					if (option.multiselectable == false) {
						scope.options.forEach(function(element, index) {
							element.checked = false;
						});
						scope.$parent[attrs.ngModel] = [];
						option.checked = true;
						scope.$parent[attrs.ngModel].push(option);
					}else{
						scope.$parent[attrs.ngModel].forEach(function(element, index) {
							if (element.multiselectable == false) {
								scope.$parent[attrs.ngModel].splice(index, 1);
								element.checked = false;
							}
							if (option.value == element.value) {
								scope.$parent[attrs.ngModel].splice(index, 1);
								found = true;
								option.checked = false;
							}
						});
						if (!found) {
							option.checked = true;
							scope.$parent[attrs.ngModel].push(option);
						}
					}
					scope.ngChange();
				}
			}
		}
	};
}]);
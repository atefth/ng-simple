angular
.module('ngSimple')
.directive('ngSimpleDualProgressBar', ['$document', function ($document) {
	return {
		restrict: 'EA',
		scope: {
			// models
      min: '=min',
      max: '=max',
      score: '=score',
      status: '=status',
      statuses: '=statuses',
      extraStatuses: '=extraStatuses',
      symbol: '=symbol',
      scoreText: '=scoreText',
      template: '=',
		},
    templateUrl: function(element, attrs) {
      return attrs.template || 'simple-dual-progress-bar.html';
    },
		link: function (scope, element, attrs) {
      var selectedStatus = undefined;
      var orders = scope.statuses.length;
      var width = undefined;
      var pointerWidth = undefined;
      var pointer = angular.element(element[0].querySelector('.ng-simple-pointer'));
      var progress = angular.element(element[0].querySelector('.ng-simple-progress'));
      var progressBar = angular.element(element[0].querySelector('.ng-simple-progress .progress .progress-bar'));

      function setWidth() {
        if (scope.score == 0) {
          width = 1;
        }else {
          width = (scope.score/scope.max)*100;
        }
        if (width > 0 && width < 100) {
          scope.class = 'warning';
        }else {
          scope.class = 'success';
        }
        scope.width = Math.floor(width);
        setStatus();
      }

      function setStatus() {
        var isExtra = true;
        scope.statuses.forEach( function(element, index) {
          if (element.value == scope.status) {
            selectedStatus = element;
            isExtra = false;
          }
        });
        if (isExtra) {
          scope.extraStatuses.forEach( function(element, index) {
            if (element.value == scope.status) {
              selectedStatus = element;
            }
          });
          pointerWidth = progress.prop('clientWidth')*(scope.width/100);
          isExtra = false;
        }else{
          pointer.css({'background-color': '#e6e6e6', 'box-shadow': 'none', opacity: 0.8});
          if (selectedStatus.order == 0) {
            pointerWidth = progress.prop('clientWidth')*(1/orders);
          }else{
            pointerWidth = progress.prop('clientWidth')*((selectedStatus.order+1)/orders);
          }
        }
        pointer.css({width: pointerWidth + 'px'});
        pointer.css({'background-color': selectedStatus.color, 'box-shadow': '0 0 1px ' + selectedStatus.color, opacity: 0.8});
      }

      scope.$watch('score', function (newValue, oldValue) {
        setWidth();
      });

      scope.$watch('status', function (newValue, oldValue) {
        setStatus();
      });
		}
	};
}]);
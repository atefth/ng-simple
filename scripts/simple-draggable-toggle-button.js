angular
.module('ngSimple')
.directive('ngSimpleDraggableToggleButton', ['$document', function ($document) {
	return {
		restrict: 'EA',
		// require: 'ngModel',
		scope: {
			// models
      output: '=ngModel',
      onColor: '=onColor',
      offColor: '=offColor',
      // settings based on attribute
      template: '=',
      disabled: '=',
      // callbacks
      ngChange: '&',
		},
    templateUrl: function(element, attrs) {
      return attrs.template || 'simple-draggable-toggle-button.html';
    },
		link: function (scope, element, attrs) {
			var min, max, pos, start, x;
			var checkbox = angular.element(element[0].querySelector('input'));
			var container = angular.element(element[0].querySelector('.ng-simple-slider-container'));
			var slider = angular.element(element[0].querySelector('.ng-simple-slider'));
			var padding = slider.prop('offsetLeft');
			var sliderWidth = slider.width();
			var buttonWidth = element.width();
      min = padding;
      max = buttonWidth - sliderWidth - padding;
      slider.css({position: 'absolute'});

      slider.bind('mousedown', function($event) {
        start = $event.clientX;
        $document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);
        return false;
      });

      function toggle(status) {
        var offColor, onColor, shadow;
        shadow = '0 0 1px ' + scope.onColor;
        onColor = scope.onColor;
        offColor = scope.offColor;
        if (status === 1 || status === true) {
          slider.css({
            left: max + 'px'
          });
          container.css({
            'background-color': onColor
          });
          container.css({
            'box-shadow': shadow
          });
          return container.css({
            'border-radius': '8px 0px 0px 8px'
          });
        } else {
          slider.css({
            left: min + 'px'
          });
          container.css({
            'background-color': offColor
          });
          container.css({
            'box-shadow': 'none'
          });
          return container.css({
            'border-radius': '0px 8px 8px 0px'
          });
        }
      };

      toggle(scope.$parent[attrs.ngModel]);

      function watcher(newValue, oldValue) {
        if (newValue !== oldValue) {
          return toggle(newValue);
        }
      };

      scope.$parent.$watch(attrs.ngModel, watcher, true);

      function mousemove($event) {
        pos = slider.prop('offsetLeft');

        if (!checkbox.checked) {
          x = $event.clientX - start;
          x = x + pos;
        } else {
          x = start - $event.clientX;
          x = pos - x;
        }

      	if (x >= min && x <= max) {
	        slider.css({left: min + x + 'px'});
      	}else{
      		mouseup();
      	}
        return false;
      }

      function mouseup() {
        pos = slider.prop('offsetLeft');
      	if ((pos - min) > (max - pos)) {
	      	checkbox.checked = false;
      	}else{
	      	checkbox.checked = true;
      	}
      	toggle(checkbox.checked);
        scope.$parent[attrs.ngModel] = checkbox.checked;
        scope.ngChange();
        $document.unbind('mousemove', mousemove);
        $document.unbind('mouseup', mouseup);
      }
		}
	};
}]);
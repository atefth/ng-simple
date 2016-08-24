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
      disabled: '=',
      // callbacks
      ngChange: '&',
		},
		templateUrl: '../templates/simple-draggable-toggle-button.html',
		link: function (scope, element, attrs) {
			var min, max, pos;
			var checkbox = angular.element(element[0].querySelector('input'));
			var container = angular.element(element[0].querySelector('.slider-container'));
			var slider = angular.element(element[0].querySelector('.slider'));
			var padding = slider.prop('offsetLeft');
			var sliderWidth = slider.width();
			var buttonWidth = element.width();
      min = padding;
      max = buttonWidth - sliderWidth - padding;
      slider.css({position: 'absolute'});
      if (scope.$parent[attrs.ngModel]) {
      	checkbox.checked = true;
      }else{
      	checkbox.checked = false;
      }
      toggle(checkbox.checked);

      slider.bind('mousedown', function($event) {
        $document.bind('mousemove', mousemove);
        $document.bind('mouseup', mouseup);
        return false;
      });

      function mousemove($event) {
        pos = slider.prop('offsetLeft');
        var x = $event.clientX-element.prop('offsetLeft');
        x = x - pos;
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

      function toggle(status) {
      	var shadow = '0 0 1px ' + scope.onColor;
      	var on = scope.onColor;
      	var off = scope.offColor;
        if (status) {
	        slider.css({left: (max) + 'px'});
	        container.css({'background-color': on});
	        container.css({'box-shadow': shadow});
        }else{
	        slider.css({left: (min) + 'px'});
	        container.css({'background-color': off});
	        container.css({'box-shadow': 'none'});
        }
      }
		}
	};
}]);
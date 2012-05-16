(function($) {
	$.mousedirections = function(options) {
		var settings = {
			triggerButton: 3,
			directions: ['up','down','left','right'],
			showArrows: true,
			arrowHeight: 200,
			arrowWidth: 286,
			arrows: {
				up: 'up.png',
				down: 'down.png',
				left: 'left.png',
				right: 'right.png'
			},
			imagePath: 'img/'
		},startPos,endPos,gesturing,arrow;

		$.extend(true,settings,options);
		
		$(document).mousedown(function(e) {
			if (e.which === settings.triggerButton) {
				startPos = {x:e.pageX,y:e.pageY};
				arrow = $('<img/>',{id: 'mouse-directions-gesture-arrow', style:'display:none;position:absolute'});
				$('body').append(arrow);
				$(document).mousemove(onMove);
			}
		});
		
		$(document).mouseup(function(e) {
			if (e.which === settings.triggerButton) {
				endPos = {x:e.pageX,y:e.pageY};
				var deltax = endPos.x - startPos.x, deltay = endPos.y - startPos.y;
				
				if (Math.max(deltax,deltay) > 2) {
					$(document).one('contextmenu',function(){return false;});
					$(document).trigger('jquery.mousedirections.gesture', direction(startPos,endPos));
				}
				$(document).unbind('mousemove',onMove);
				$('#mouse-directions-gesture-arrow').remove();				
			}
		});
			
		function onMove(e) {
			var dir = direction(startPos,{x:e.pageX,y:e.pageY}),arroww,arrowh,arrowx,arrowy;
			if (dir === 'up' || dir === 'down') {
				arroww = settings.arrowWidth;
				arrowh = settings.arrowHeight;
				arrowx = startPos.x - arroww/2;
				arrowy = dir === 'up' ? startPos.y - arrowh : startPos.y;
			} else {
				arroww = settings.arrowHeight;
				arrowh = settings.arrowWidth;
				arrowy = startPos.y - arrowh/2;
				arrowx = dir === 'left' ? startPos.x - arroww : startPos.x;
			}
			console.log(startPos);
			arrow.prop('src', settings.imagePath + settings.arrows[dir]).css({top: arrowy + 'px', left: arrowx + 'px', width: arroww + 'px', height: arrowh + 'px'}).show();
		}
	}
	
	function direction(point1,point2) {
		var deg = Math.atan2(point2.y-point1.y,point2.x-point1.x) * (180/Math.PI);
		if (deg > -135 && deg <= -45) {
			return "up";
		} else if (deg > -45 && deg <= 45) {
			return "right";
		} else if (deg > 45 && deg <= 135) {
			return "down";
		} else {
			return "left";
		}
	}
})(jQuery);
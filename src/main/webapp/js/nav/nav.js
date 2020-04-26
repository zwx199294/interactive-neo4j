$(function() {

	var left = $('.left');
	var right = $('.right');
	var down = $('.down');
	var up = $('.up');
	var bg = $('.bgDiv');
	var leftNav = $('.leftNav');
	var rightNav = $('.rightNav');
	var downNav = $('.downNav');
	var upNav = $('.upNav');
	var body = $('body');

	bg.on('click', function() {
		hideNav();
	});

	function hideNav() {
		leftNav.css({
			left : "-50%",
			transition : "left .5s"
		});
		rightNav.css({
			right : "calc(-40% + 40px)",
			transition : "right .5s"
		});
		upNav.css({
			top : "-40%",
			transition : "top .5s"
		});
		downNav.css({
			bottom : "-50%",
			webkitTransition : "bottom .5s",
			oTransition : "bottom .5s",
			mozTransition : "bottom .5s",
			transition : "bottom .5s"
		});
		bg.css({
			display : "none",
			transition : "display 1s"
		});
		body.css({
			"overflow-y" : "auto"
		});
	}
});
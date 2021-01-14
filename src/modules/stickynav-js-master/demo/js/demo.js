$(document).ready(function() {

	/* Метод Animate.css */
	$.fn.extend({
		animateCss: function(animationName, callback) {
			var animationEnd = (function(el) {
				var animations = {
					animation: 'animationend',
					OAnimation: 'oAnimationEnd',
					MozAnimation: 'mozAnimationEnd',
					WebkitAnimation: 'webkitAnimationEnd',
				};

				for (var t in animations) {
					if (el.style[t] !== undefined) {
						return animations[t];
					}
				}
			})(document.createElement('div'));

			this.addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);

				if (typeof callback === 'function') callback();
			});

			return this;
		},
	});

	$('.site-header').stickyNav({

		// mode: 'custom',
		stickyClass: 'sticky-nav animation-options',
		// visibleClass: 'visible',
		// scrollTop: 0,
		// scrollFrom: 'document',
		// offWidth: 767,

		beforeShow: function(sets) {
			// console.log( 'beforeShow', $(this), sets );
		},

		beforeHide: function(sets) {
			// console.log( 'beforeHide', $(this), sets );
		},

		afterShow: function(sets) {

			/* Анимация появления JQ */
			// sets.stickyElem.hide().fadeIn();

			/* Анимация появления Animate.css */
			// var stickyElem = sets.stickyElem;
			// stickyElem.animateCss('bounceInDown', function() {
			// 	stickyElem.show();
			// });

		},

		afterHide: function(sets) {

			/* Анимация исчезновения JQ */
			// sets.stickyElem.show().fadeOut();

			/* Анимация исчезновения Animate.css */
			// var stickyElem = sets.stickyElem;
			// stickyElem.show().animateCss('fadeOut', function() {
			// 	stickyElem.hide();
			// });

		},

	});

	/* МЕТОДЫ: */
	$('.Show').on('click', function() {
		$('.site-header').eq(0).stickyNav('show');
	});

	$('.Hide').on('click', function() {
		$('.site-header').eq(0).stickyNav('hide');
	});

	$('.Init').on('click', function() {
		$('.site-header').eq(0).stickyNav('init');
	});

	$('.Reinit').on('click', function() {
		$('.site-header').eq(0).stickyNav('reinit');
	});

	$('.Destroy').on('click', function() {
		$('.site-header').eq(0).stickyNav('destroy');
	});

});
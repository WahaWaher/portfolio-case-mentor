;(function($) {

	var methods = {

		init: function(options) {

			var defaults = $.extend(true, {

				mode: 'default',
				
				stickyClass: 'sticky-nav',
				visibleClass: 'visible',

				scrollFrom: $(this),
				scrollTop: 0,
				offWidth: 767,

				// Состояние(видимость) прилипающего эл-та
				_visibility: false, 

				beforeInit: function() {},
				afterInit:  function() {},
				beforeShow: function() {},
				afterShow:  function() {},
				beforeHide: function() {},
				afterHide:  function() {},

			}, $.fn.stickyNav.defaults);

			this.each(function() {
				var $ths = $(this);

				if( $ths.data('_init') == true ) return false;

				$ths.data('defaults', defaults);
				$ths.data('options', options);

				var data = $ths.attr('data-stickynav');
				data = eval('(' + data + ')');
				if( typeof(data) != 'object') data = {};

				$ths.data('settings', $.extend(true, {}, defaults, options, data));
				var sets = $ths.data('settings');

				// Callback: beforeInit()
				sets.beforeInit.call($ths, sets);

				sets.stickyElem = $ths
					.clone()
					.addClass(sets.stickyClass)
					.appendTo($('body'));

				if( sets.mode == 'default' )
					sets.stickyElem
						.css({
							position: 'fixed',
							top: 0, left: 0, right: 0
						}).hide();

				// ID для генерации уник.числа (пространство имен, обраб.)
				sets._nsid = randInt(10000000, 99999999);

				$(window).on('scroll.sm-'+sets._nsid+' resize.sm-'+sets._nsid, function() {

					if( sets.offWidth && $(window).outerWidth() <= sets.offWidth ) {
						methods.hide.call($ths);
						return false;
					}
					
					var docTop = $(document).scrollTop();

					if( sets.scrollFrom !== 'document')
						docTop = docTop - sets.scrollFrom.offset().top;

					if( docTop >= sets.scrollTop && sets._visibility === false )
						methods.show.call($ths);

					if( docTop < sets.scrollTop && sets._visibility === true )
						methods.hide.call($ths);

				}).resize();

				$ths.data('_init', true);

				// Callback: afterInit()
				sets.afterInit.call($ths, sets);

			});

			return $(this);

		},

		destroy: function() {
			if( !$(this).data('_init') ) return false;
			var $ths = $(this), sets = $ths.data('settings');

				$(window)
					.off('scroll.sm-'+sets._nsid)
					.off('resize.sm-'+sets._nsid);
				
				sets.stickyElem.remove();

				$ths.removeData();

			return $(this);

		},

		reinit: function(newOpts) {
			var $ths = $(this), sets = $ths.data('settings');

			var oldOpts = $ths.data('options');
			methods.destroy.call($ths);

			if( newOpts && typeof(newOpts) == 'object' )
				methods.init.call($ths, newOpts);
			else methods.init.call($ths, oldOpts);

			return $(this);

		},

		show: function() {
			var $ths = this, sets = $ths.data('settings');
			if( !sets || sets._visibility === true ) return false;

			// Callback: beforeShow()
			sets.beforeShow.call($ths, sets);

			sets.stickyElem
				.addClass(sets.visibleClass);

			if( sets.mode == 'default' )
				sets.stickyElem.show();

			sets._visibility = true;

			// Callback: afterShow()
			sets.afterShow.call($ths, sets);

			return $(this);

		},

		hide: function() {
			var $ths = this, sets = $ths.data('settings');
			if( !sets || sets._visibility === false ) return false;

			// Callback: beforeHide()
			sets.beforeHide.call($ths, sets);

			sets.stickyElem
				.removeClass(sets.visibleClass);

			if( sets.mode == 'default' )
				sets.stickyElem.hide();

			sets._visibility = false;

			// Callback: afterHide()
			sets.afterHide.call($ths, sets);

			return $(this);

		},

	};

	// Функция для генерации случаного числа
	function randInt( min, max ) {
		var rand = min - 0.5 + Math.random() * (max - min + 1)
		rand = Math.round( rand );
		return rand;
	}

	$.fn.stickyNav = function(methOrOpts) {
		if ( methods[methOrOpts] ) {
			return methods[ methOrOpts ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof methOrOpts === 'object' || ! methOrOpts ) {
			methods.init.apply( this, arguments );
			return this;
		} else $.error( 'Method ' +  methOrOpts + ' does not exist on jQuery.stickyNav' );
	};

})(jQuery);
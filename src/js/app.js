$(document).ready(function (document, window, setTimeout) {
  setTimeout(function () {
    $('.app-header').stickyNav({
      scrollTop: 500,
      mode: 'custom',
      stickyClass: 'sticky-nav animation-options',
      visibleClass: 'visible',
    });
  }, 0);

  /**
   * lazysizes
   */
  // $(document)
  //   .on('lazybeforeunveil', function(e) {
  //   })
  //   .on('lazyloaded', function(e) {
  //   });

  /**
   * Fancybox: basic options
   * doc: https://fancyapps.com/fancybox/3/docs/#options
   */
  $.extend(true, $.fancybox.defaults, {
    idleTime: 5,
    animationEffect: 'material',
    animationDuration: 350,
    transitionEffect: 'circular',
    transitionDuration: 550,
    // open/close animation
    // animation: {
    //   open: {
    //     name: 'zoomIn',
    //     duration: 450,
    //   },
    //   close: {
    //     name: 'rotateRight',
    //     duration: 950,
    //   }
    // },
    btnTpl: {
      smallBtn:
        '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
        '<i class="aif-close-circle"></i>' +
        '</button>'
    },
    lang: 'ru',
    i18n: {
      'ru': {
        CLOSE: 'Закрыть',
        NEXT: 'Далее',
        PREV: 'Назад',
        ERROR: 'Не удалось загрузить содержимое.<br>Пожалуйста, попробуйте позже.',
        PLAY_START: 'Запустить слайд-шоу',
        PLAY_STOP: 'Остановить слайд-шоу',
        FULL_SCREEN: 'На весь экран',
        THUMBS: 'Миниатюры',
        DOWNLOAD: 'Скачать',
        SHARE: 'Поделиться',
        ZOOM: 'Масштаб'
      }
    }
  });

  /**
   * AppDrawer
   */
  var appDrawer = new Drawer('.app-drawer', {
    width: 375,
    position: 'right',
  });

  setTimeout(function () {
    $(appDrawer.nodes.drawer).prop('hidden', false);
  }, 0)

  var $hamburger = $('[data-appDrawer-toggle]');

  $hamburger.on('click', appDrawer.switch.bind(appDrawer));

  appDrawer.nodes.drawer.addEventListener('wdrawer.open', function () {
    $hamburger.addClass('is-active');
  });

  appDrawer.nodes.drawer.addEventListener(
    'wdrawer.close',
    $hamburger.removeClass.bind($hamburger, 'is-active')
  );

  /**
   * LazySizes Init
   */
  lazySizes.init();

  /**
   * Scroll to block
   */
  // Scroll to selector
  function scrollToSelector(selector) {
    if (!selector) return false;

    $('html,body')
      .stop()
      .animate(
        {
          scrollTop: getOffset(selector)
        },
        {
          duration: 1100,
          easing: 'swing',
          step: function(now, fx) {
            var newDest = getOffset(selector);

            if (fx.end !== newDest) fx.end = newDest;
          },
          complete: function() {
            if (history.pushState) {
              history.pushState(null, null, selector);
            } else {
              location.hash = selector;
            }
          }
        }
      );
  }

  // Gets current offsetTop
  function getOffset(selector) {
    var offset = $(selector).offset();

    return offset ? offset.top : 0;
  }

  if (location.hash) {
    // Disable default anchor scroll
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 0);

    // Animate anchor scroll when page loaded
    setTimeout(function() {
      scrollToSelector(location.hash);
    }, 250);
  }

  $('a.scroll-to').click(function() {
    var $this = $(this);
    var href = $this.attr('href');
    var parts = href.split('#');
    var selector = parts[1] ? '#' + parts[1] : '';

    if (!selector) return false;

    // disable animate scroll for links that lead to other pages
    if (parts[0]) return;

    try {
      appDrawer.close();
    } catch(e) {}

    scrollToSelector(selector);

    return false;
  });
  /* Scroll to block: End */

  /* Back to top button: Start */
  var navButton = $('#top-button'),
    screenHeight = $(window).height(),
    topShow = screenHeight, // hidden before (screenHeight or Number), px
    navSpeed = 1200; // speed, ms

  function scrollCalc() {
    var scrollOut = $(window).scrollTop();

    if (
      scrollOut > topShow &&
      (navButton.attr('class') == '' || navButton.attr('class') == undefined)
    )
      navButton
        .fadeIn()
        .removeClass('down')
        .addClass('up')
        .attr('title', 'Наверх');
    if (scrollOut < topShow && navButton.attr('class') == 'up')
      navButton.fadeOut().removeClass('up down');
    if (scrollOut > topShow && navButton.attr('class') == 'down')
      navButton
        .fadeIn()
        .removeClass('down')
        .addClass('up');
  }

  $(window).bind('scroll', scrollCalc);
  var lastPos = 0;

  navButton.bind('click', function() {
    scrollOut = $(window).scrollTop();

    if (navButton.attr('class') == 'up') {
      lastPos = scrollOut;
      $(window).unbind('scroll', scrollCalc);

      $('body, html').animate(
        {
          scrollTop: 0
        },
        navSpeed,
        'swing',
        function() {
          navButton
            .removeClass('up')
            .addClass('down')
            .attr('title', 'Вернуться');
          $(window).bind('scroll', scrollCalc);
        }
      );
    }
    if (navButton.attr('class') == 'down') {
      $(window).unbind('scroll', scrollCalc);

      $('body, html').animate(
        {
          scrollTop: lastPos
        },
        navSpeed,
        'swing',
        function() {
          navButton
            .removeClass('down')
            .addClass('up')
            .attr('title', 'Наверх');
          $(window).bind('scroll', scrollCalc);
        }
      );
    }
  });
  /* Back to top button: End */
}.bind(null, document, window, setTimeout));

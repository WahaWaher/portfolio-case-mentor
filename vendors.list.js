/**
 * App vendors
 * <vendor-name>: <vendor-path>
 */
module.exports = {
  'jquery': './node_modules/jquery/dist/jquery.js',
  'lazysizes.build': [
    './node_modules/lazysizes/plugins/unveilhooks/ls.unveilhooks.js',
    './node_modules/lazysizes/plugins/object-fit/ls.object-fit.js',
    './node_modules/lazysizes/plugins/respimg/ls.respimg.js',
    './node_modules/lazysizes/lazysizes.js',
    // './node_modules/lazysizes/plugins/bgset/ls.bgset.js',
  ],
  'fancybox.build': [
    './node_modules/@fancyapps/fancybox/src/js/core.js',
    // './node_modules/@fancyapps/fancybox/src/js/fullscreen.js',
    './node_modules/@fancyapps/fancybox/src/js/guestures.js',
    // './node_modules/@fancyapps/fancybox/src/js/hash.js',
    './node_modules/@fancyapps/fancybox/src/js/media.js',
    // './node_modules/@fancyapps/fancybox/src/js/share.js',
    // './node_modules/@fancyapps/fancybox/src/js/slideshow.js',
    // './node_modules/@fancyapps/fancybox/src/js/thumbs.js',
    // './node_modules/@fancyapps/fancybox/src/js/wheel.js',
  ],
  'polyfills.build': [
    './src/modules/object-assign-polyfill/object-assign.js'
  ],
  'wdrawer': './src/modules/wdrawer/wdrawer.js',
  'stickynav': './src/modules/stickynav-js-master/dist/jquery.stickynav.js',
};


require.config({
    baseUrl: 'js',
    shim: {
        'jquery.gameQuery': ['jquery'],
    },
    paths: {
        'jquery.gameQuery': 'vendor/jquery.gamequery-0.7.1-modified',
        jquery: 'vendor/jquery-1.8.3.min',
        modernizr: 'vendor/modernizr-2.6.2.min',
    },
    waitSeconds: 0
});

// Don't change the next line, it's needed by the testing framework
// BASE-CONFIG-END //
(function () {
    'use strict';
    var VERSION = '1.0.0';

    // Load the game
    require(['modernizr']);
    if (DEBUG) {
        // In dev, also load the FPSMeter
        require(['vendor/fpsmeter.min']);

        // Make sure files are reloaded on every request
        require.config({
            urlArgs: 'v=' + (new Date()).getTime()
        });
    }
    else {
        // If not in dev, load the errorHandler
        require(['core/errorHandler']);

        // Add version number to js files
        require.config({
            urlArgs: 'v=' + VERSION
        });
    }
    require(['game'], function (game) {
        // Get the game and init
        game.init();
    });
})();
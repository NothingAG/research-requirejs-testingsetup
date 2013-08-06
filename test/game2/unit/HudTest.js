/**
 * @copyright Nothing Interactive 2013
 * @author Patrick Fiaux <nodz@nothing.ch>
 * @author Tobias Leugger <vibes@nothing.ch>
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */
/*global suite, should, test, setup, teardown */

/**
 * Here we want to test Hud but it requires game, we don't want to do integration tests just unit
 * tests of the hud, so we'll make a mock game with just addScoreListener which is all we need to
 * test the hud.
 *
 * So we will:
 * - Create a mock player
 * - Load the hud and store the callback via the mock
 * - Use the callback to set scores and test
 *
 * Notice we require squire but not Hud, we only load it with the injector after setting up the mock
 */
define(['libs/Squire'], function (Squire) {
  'use strict';

  // Setup squire
  var injector = new Squire();

  // Here we'll store the game's score listener, we don't use an array to keep it simple
  var scoreListener = null;

  /*
   * Here we create the mock game
   * all we need to implement is addScoreListener
   */
  injector.mock('game', {
    addScoreListener: function (callback) {
      // Store the callback to use it later
      scoreListener = callback;
    }
  });

  suite('Hud.js Tests', function () {

    /**
     * The setup runs before each test, we'll use it to reset the listener callback to make
     * sure we don't use an old one.
     */
    setup(function() {
      scoreListener = null;
    });

    /**
     * Reset Hud after every test, this forces a fresh one to be loaded
     */
    teardown(function () {
      injector.clean(['Hud']);
    });

    /**
     * First we check that it registers as expected
     */
    suite('hud() constructor', function () {
      test('registers callback.', injector.run(['Hud'], function (Hud) {
        /*
         * Once we're in here we run our tests as we normally would
         */
        var hud = new Hud();

        // Test that it is a function
        scoreListener.should.be.a('function');
      }));

      test('initial score is 0', injector.run(['Hud'], function (Hud) {
        /*
         * Once we're in here we run our tests as we normally would
         */
        var hud = new Hud();

        hud.getFormattedScore().should.be.equal('0');
      }));
    });

    suite('.getFormattedScore()', function () {
      test(' returns the correct score', injector.run(['Hud'], function (Hud) {
        var hud = new Hud();

        var someScore = Math.round((Math.random()*900)+1);

        scoreListener(someScore);

        hud.getFormattedScore().should.be.equal(someScore.toString());
      }));

      test('Formats score correctly', injector.run(['Hud'], function (Hud) {
        var hud = new Hud();

        scoreListener(123456789);

        hud.getFormattedScore().should.be.equal('123\'456\'789');
      }));

    });

  });
});
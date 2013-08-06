/**
 * @copyright Nothing Interactive 2013
 * @author Patrick Fiaux <nodz@nothing.ch>
 * @author Tobias Leugger <vibes@nothing.ch>
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */
/*global suite, should, test */

/**
 * Here we want to test HighScores without having to load ajaxScores because
 * for reason xyz we don't have access to the scores API and we need to use test
 * data to check edge cases and what not.
 *
 * So we will:
 * - Create a mock ajaxScores
 * - Load HighScores via squire to inject our mock
 * - Test highScores based on our mock
 *
 * Notice we require squire but not HighScore which is the class we want to test!
 */
define(['libs/Squire'], function (Squire) {
  'use strict';

  // Setup squire
  var injector = new Squire();

  /*
   * Here we create the mock ajaxScores
   * all we need to implement is getHighScores
   */
  injector.mock('ajaxScores', {
    getHighScores: function () {
      // Return some fake scores
      return [
        {player: 'Nodz', score: 1000},
        {player: 'Rune', score: 900},
        {player: 'Cyclodex', score: 750},
        {player: 'Pulse', score: 512},
        {player: 'Nodz', score: 264},
        {player: 'Vibes', score: 42}
      ];
    }
  });

  suite('HighScores.js Tests', function () {

    suite('.getHighestScore()', function () {
      /*
       * Here we finally require HighScore but through Squire so we can control it's dependencies.
       * The injector has a mock ajaxScores so when it requires HighScore it will use it instead of the real one.
       */
      test('Nodz should be on top with 1000 points', injector.run(['HighScores'], function (HighScores) {
        /*
         * Once we're in here we run our tests as we normally would
         */
        var scoreDisplay = new HighScores();

        var highestScore = scoreDisplay.getHighestScore();

        // Test that it was a function
        highestScore.player.should.equal('Nodz');
        highestScore.score.should.equal(1000);
      }));
    });

    suite('.getPlayerHighScore()', function () {
      test('Vibes has a highscore', injector.run(['HighScores'], function (HighScores) {
        var scoreDisplay = new HighScores();

        var playerScore = scoreDisplay.getPlayerHighScore('Vibes');

        playerScore.should.be.a('Number');
        playerScore.should.equal(42);
      }));

      test('Integrator doesn\'t play games, no highscore', injector.run(['HighScores'], function (HighScores) {
        var scoreDisplay = new HighScores();

        var playerScore = scoreDisplay.getPlayerHighScore('Integrator');

        playerScore.should.false;
      }));

    });

  });
});
/**
 * @copyright Nothing Interactive 2013
 * @author Patrick Fiaux <nodz@nothing.ch>
 * @author Tobias Leugger <vibes@nothing.ch>
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */

/**
 * HUD Head's Up Display!
 *
 * The hud will display some info including the current score which it will
 * get from the game.
 */
define(['game','jquery'], function (game,$) {
  'use strict';

  /**
   * Class Hud
   * @constructor
   */
  function Hud() {
    /**
     * The current score
     * @type {number}
     * @private
     */
    this._currentScore = 0;

    // Here we register the Hud as a score listener
    game.addScoreListener($.proxy(this.updateScore, this));
  }

  /**
   * This gets a score update from the game and updates the variable
   * then on the next draw it will be able to display the new score...
   * @param newScore
   */
  Hud.prototype.updateScore = function (newScore) {
    this._currentScore = newScore; //TODO this doesn't work here :(
  };

  /**
   * Returns the current score formatted before display.
   * I just need a public method I can test here, this adds a ' separator
   * every 3 digits starting from the lows.
   * @returns {string}
   */
  Hud.prototype.getFormattedScore = function() {
    var score = this._currentScore.toString();

    // first chunk no ' it's the first 1-3 numbers
    var firstChunk = score.length % 3;
    // take at 3 if if not 1 or 2 left.
    if (firstChunk === 0) { firstChunk = 3; }

    var formatted = score.substr(0,firstChunk);

    // add the ' to the francs every 3 decimals
    for(var i = firstChunk; i < score.length; i+=3) {
      formatted = formatted + "'" + score.substr(i,3);
    }

    return formatted;
  };

  // Export
  return Hud;
});
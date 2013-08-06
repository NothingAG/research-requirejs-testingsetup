/**
 * @copyright Nothing Interactive 2013
 * @author Patrick Fiaux <nodz@nothing.ch>
 * @author Tobias Leugger <vibes@nothing.ch>
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */

/**
 * HighScores Display View
 */
define(['ajaxScores'], function (ajaxScores) {
  'use strict';

  /**
   * Class HighScores
   * @constructor
   */
  function HighScores() {

    /**
     * HighScores
     * Sorted from high to low.
     * @type {[{player: string, score: number}]} scores array
     * @private
     */
    this._scores = ajaxScores.getHighScores();
  }

  /**
   * Get the highest score
   * @returns {{player: string, score: number}}
   * @throws Error if there's no highScore loaded
   */
  HighScores.prototype.getHighestScore = function() {
    if (this._scores.length === 0) {
      throw new Error('Scores not loaded');
    }
    return this._scores[0];
  };

  /**
   * Returns the player's highest score or false if the player doesn't have one yet.
   * @param {string} player
   * @returns {number|boolean}
   */
  HighScores.prototype.getPlayerHighScore = function(player) {

    // for each highScore check if player is the score player get it and return
    for (var i = 0; i < this._scores.length; i++) {
      if (this._scores[i].player === player) {
        // Return the player's highest score
        return this._scores[i].score;
      }
    }

    // score not found
    return false;
  };

  // Export
  return HighScores;
});
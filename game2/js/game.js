/**
 * @copyright Nothing Interactive 2013
 * @author Patrick Fiaux <nodz@nothing.ch>
 * @author Tobias Leugger <vibes@nothing.ch>
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */

/**
 * game 2 even more awesome than game 1
 */
define(
  ['config','HighScores','jquery', 'jquery.gameQuery'],
  function (config, HighScores, $) {
    'use strict';

    /**
     * Class game
     * @constructor
     */
    function game() {

      /**
       * Score listeners
       * @type {Array} callbacks
       * @private
       */
      this._scoreListener = [];

      // super awesome game logic here
    }

    /**
     * Adds a score listener to the game. It will be notified when the score is updated.
     * @param listener
     */
    game.prototype.addScoreListener = function(listener) {
      this._scoreListener.push(listener);
    };

  }
);
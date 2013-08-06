/**
 * @copyright Nothing Interactive 2013
 * @author Patrick Fiaux <nodz@nothing.ch>
 * @author Tobias Leugger <vibes@nothing.ch>
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */

/**
 * ajaxScores
 *
 */
define(['config', 'jquery'], function (config, $) {
  'use strict';

  /** --------------------------------------------
   * Private static
   *  --------------------------------------------*/

  /**
   * Keep the scores once loaded
   * @type {[{player: string, score: number}]}
   */
  var scores = {};

  /**
   * Function to load the scores from some remote place
   * @private
   */
  var _loadScores = function(url) {
      // Some ajax score that loads the code from a remote server here
  };

  // Let's assume this happens synchronously here for simplifying the example.
  _loadScores(config.SCORE_API);

  /**
   * ajaxScores singleton
   * @type {{getHighScores: Function}}
   */
  var ajaxScores = {

    /** --------------------------------------------
     * Public static
     *  --------------------------------------------*/

    /**
     * Returns highScores data
     * @returns {[{player: string, score: number}]} Scores in player: score format
     */
    getHighScores: function () {
      return scores;
    }
  };

  // Export
  return ajaxScores;
});

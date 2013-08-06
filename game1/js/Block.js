/**
 * @copyright Nothing Interactive 2013
 * @author Patrick Fiaux <nodz@nothing.ch>
 * @author Tobias Leugger <vibes@nothing.ch>
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */

/**
 * Block
 */
define(['config'], function (config) {
  'use strict';

  /**
   * Class Block
   * @constructor
   */
  function Block() {

    /**
     * Block size
     * @type {number} size
     * @private
     */
    this._size = config.CONFIG_VAR_1;
  }

  /**
   * Get the area of a block
   * @returns {number} area
   */
  Block.prototype.getArea = function() {
    return this._size * this._size;
  };

  // Export
  return Block;
});
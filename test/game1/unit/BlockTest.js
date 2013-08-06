/**
 * @copyright Nothing Interactive 2013
 * @author Patrick Fiaux <nodz@nothing.ch>
 * @author Tobias Leugger <vibes@nothing.ch>
 * @license http://www.gnu.org/licenses/lgpl-3.0.html LGPL
 */
/*global suite, should, test */

/**
 * Simple tests here
 */
define(['Block'], function (Block) {
  'use strict';
  suite('Block.js', function () {
    test('has area', function () {
      var b = new Block();
      b.getArea().should.be.a('number');
    });

    test('area meets minimum size', function () {
      var b = new Block();
      b.getArea().should.be.above(100);
    });
  });
});
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
define(['config'], function (config) {
  'use strict';
  suite('config.js', function () {
    test('should exist', function () {
      should.exist(config);
      config.should.be.an('Object');
    });

    test('config.CONFIG_VAR_1 is a number', function () {
      should.exist(config);
      config.CONFIG_VAR_1.should.be.a('number');
    });

    test('config.CONFIG_VAR_A is a string', function () {
      should.exist(config);
      config.CONFIG_VAR_A.should.be.a('string');
    });
  });
});
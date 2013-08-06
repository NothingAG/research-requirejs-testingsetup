<?php

/**
 * Configuration
 */

// Load common functions
require_once('../lib/util.php');


// Path to source code js
define('SOURCE_TITLE', 'game1');
define('SOURCE_PATH', '../../game1/js');
define('LIBS_PATH', '../../test/lib');
define('TESTS_PATH', '../../test/game1/unit');
define('TEST_TYPE', 'Unit');

// Extract configuration from project's init.js
$require_config = extractRequireConfig(SOURCE_PATH . '/init.js');

$require_tests = generateRequireList(getScriptList(TESTS_PATH), 'tests');

/**
 * Run the tests
 */
include_once('../lib/testsTemplate.php');

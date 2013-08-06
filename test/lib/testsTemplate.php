<html>
<head>
  <title><?php echo SOURCE_TITLE . ' ' . TEST_TYPE ?> Tests</title>
  <meta charset="utf-8">
  <link rel="stylesheet" href="../lib/mocha.css"/>
  <link rel="stylesheet" href="../lib/nothing.css"/>
  <script type="text/javascript" src="<?php echo SOURCE_PATH ?>/vendor/require.min.js"></script>
  <script type="text/javascript">

    // Chai global functions, will be assigned further down
    var should;
    var assert;
    var expect;

    // Testing config point the base path at project
    require.config({
      baseUrl: '<?php echo SOURCE_PATH ?>',
      paths: {
        'libs': '<?php echo LIBS_PATH ?>',
        'tests': '<?php echo TESTS_PATH ?>'
      },
      urlArgs: 'bust=' + (new Date()).getTime()
    });

    // Project based config
    <?php echo $require_config; ?>
    require(['require', 'libs/chai', 'libs/mocha'], function (require, chai) {

      /*global mocha */
      mocha.setup('tdd');
      mocha.bail(false);

      // Mocha setup
      mocha.checkLeaks();
      mocha.globals(['jQuery', '$']);
      // Export Chai stuff to global
      should = chai.should();
      assert = chai.assert;
      expect = chai.expect;

      // Load our selected tests and run them
      require([<?php echo $require_tests; ?>], function (require) {
        mocha.run();
      });
    });
  </script>
</head>
<body>

<nav id="testSelector">
    <ul>
        <?php if (SOURCE_TITLE === 'game1'): ?>
        <li class="current"><a href="index.php">Game 1 Unit Tests</a></li>
        <li><a href="../game2/index.php">Game 2 Unit Tests</a></li>
        <?php else: ?>
        <li><a href="../game1/index.php">Game 1 Unit Tests</a></li>
        <li class="current"><a href="index.php">Game 2 Unit Tests</a></li>
        <?php endif; ?>
    </ul>
</nav>

<div id="mocha"></div>

</body>
</html>
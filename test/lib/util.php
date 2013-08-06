<?php
define('INIT_START', '// BASE-CONFIG-END //');
define('BASE_URL_PATTERN', '/baseUrl: \'[\w\\\]*\',/');

/**
 * Extracts the require.config() block from an init.js
 * @precondition the require.config(); must be at the beginning of the file and followed by INIT_START.
 * @param string $initScript path to init file
 * @return null|string config or null if file doesn't exist
 */
function extractRequireConfig($initScript) {
  if (file_exists($initScript)) {
    // Cache the file
    $init = file_get_contents($initScript);

    // Figure out where the initialization starts
    $configEnd = strpos($init,INIT_START);

    // Get just the config
    $config = substr($init, 0, $configEnd);

    // Remove the base url from it to avoid overwriting it
    $config = preg_replace(BASE_URL_PATTERN,'',$config);


    return $config;
  }
  return NULL;
}

/**
 * This takes a list of scripts (with an optional path prefix)
 * and returns a quote escaped, coma separated array for js.
 * @param array $scripts list of script files
 * @param string $prefix path prefix (default '')
 * @return string 'prefix/script1', ..., 'prefix/scriptX'
 */
function generateRequireList($scripts, $prefix = '') {
  $list = array();
  // add quotes
  foreach($scripts as $script) {
    $list[] = "'".$script."'";
  }
  return implode(',',$list);
}

/**
 * Returns the list of the files in a directory in an array.
 * The list is in the $dir/script.js format
 *
 * @param string $dir       Relative path of directory to search.
 * @param bool $recursive should the sub folders be included, defaults to false
 *
 * @return array|bool false if failed to open dir, array with files in dir if success
 */
function getScriptList($dir, $recursive = FALSE) {
  $files = array();

  // Open directory
  if ($handle = opendir($dir))
  {

    // Loop all the files
    while (FALSE !== ($entry = readdir($handle)))
    {
      // Only take actual entries
      if ($entry != "." && $entry != "..")
      {
        // If it's a file and of the right type
        if (!is_dir($dir . "/" . $entry) && pathinfo($entry,PATHINFO_EXTENSION) === 'js')
        {
          $files[] = $dir . "/" . $entry;
        } // If it's a dir only parse it if recursive.
        elseif ($recursive == TRUE)
        {
          $files = array_merge(getScriptList($dir . "/" . $entry), $files);
        }

      }
    }

    // Cleanup
    closedir($handle);

    // Return the files
    return $files;
  }

  // Failed to open directory
  return FALSE;
}
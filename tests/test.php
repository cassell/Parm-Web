<?php

require_once ('test.inc.php');

$interface = new ParmWebInterface\ParmWebInterface();

$interface->addDatabase('parm_namespaced_tests', \Parm\Config::getDatabase('parm_namespaced_tests'),$namespacedGenerator);
$interface->addDatabase('parm-global-tests', \Parm\Config::getDatabase('parm-global-tests'),$globalGenerator);

$interface->init();


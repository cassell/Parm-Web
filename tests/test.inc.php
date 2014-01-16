<?php

error_reporting(E_ALL);

set_error_handler(function($number, $message, $file, $line)
{
	print_r(array( 'type' => $number, 'message' => $message, 'file' => $file, 'line' => $line ));
});

require_once dirname(dirname(__FILE__)) . '/vendor/autoload.php';

if(!defined('PARM_CONFIG_GLOBAL'))
{
	define('PARM_CONFIG_GLOBAL','PARM_CONFIG_GLOBAL');
}

$GLOBALS[PARM_CONFIG_GLOBAL]['parm_namespaced_tests'] = new Parm\Database();
$GLOBALS[PARM_CONFIG_GLOBAL]['parm_namespaced_tests']->setMaster(new Parm\DatabaseNode($GLOBALS['db_namespaced_name'],$GLOBALS['db_namespaced_host'],$GLOBALS['db_namespaced_username'],$GLOBALS['db_namespaced_password']));

$GLOBALS[PARM_CONFIG_GLOBAL]['parm-global-tests'] = new Parm\Database();
$GLOBALS[PARM_CONFIG_GLOBAL]['parm-global-tests']->setMaster(new Parm\DatabaseNode($GLOBALS['db_global_name'],$GLOBALS['db_global_host'],$GLOBALS['db_global_username'],$GLOBALS['db_global_password']));



?>
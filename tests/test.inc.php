<?php

error_reporting(E_ALL);

set_error_handler(function($number, $message, $file, $line)
{
	print_r(array( 'type' => $number, 'message' => $message, 'file' => $file, 'line' => $line ));
});

require_once dirname(dirname(__FILE__)) . '/vendor/autoload.php';

\Parm\Config::addDatabase('parm_namespaced_tests',new Parm\Mysql\DatabaseNode($GLOBALS['db_namespaced_name'],$GLOBALS['db_namespaced_host'],$GLOBALS['db_namespaced_username'],$GLOBALS['db_namespaced_password']));
\Parm\Config::addDatabase('parm-global-tests',new Parm\Mysql\DatabaseNode($GLOBALS['db_global_name'],$GLOBALS['db_global_host'],$GLOBALS['db_global_username'],$GLOBALS['db_global_password']));


$namespacedGenerator = new Parm\Generator\DatabaseGenerator(\Parm\Config::getDatabase('parm_namespaced_tests'));
$namespacedGenerator->setDestinationDirectory(dirname(__FILE__).'/dao/namespaced');
$namespacedGenerator->setGeneratedNamespace("ParmTests\\Dao");

$globalGenerator = new Parm\Generator\DatabaseGenerator(\Parm\Config::getDatabase('parm-global-tests'));
$globalGenerator->setDestinationDirectory(dirname(__FILE__).'/dao/global');
$globalGenerator->useGlobalNamespace();


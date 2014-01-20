<?php

namespace ParmWebInterface;

class ParmWebInterface
{
	private $config = array();
	
	function __construct()
	{
	}
	
	function addDatabase($logicalName, \Parm\Database $database, \Parm\Generator\DatabaseGenerator $generator)
	{
		$this->config[$logicalName] = array("database" => $database, "generator" => $generator);
	}
	
	function init()
	{
		if(array_key_exists('api', $_POST) && filter_input(INPUT_POST,'api') != "")
		{
			header("Content-Type: application/json");
			
			// this is a JSON request for an API call
			switch(filter_input(INPUT_POST,'api')):

				case 'databases':	$this->returnListOfDatabases(); break;
				
				case 'tables':	$this->returnListOfTables(filter_input(INPUT_POST,'database')); break;
				
			endswitch;
			
			
		}
		else
		{
			$page = new Page\ParmWebInterfacePage();
			$page->display();
		}
		
		
		

		
	}
	
	function returnListOfDatabases()
	{
		$databases = array();
		foreach(array_keys($this->config) as $dbName)
		{
			$databases[] = array("databaseName" => $dbName);
		}
		
		echo '{ "databases" : ' . self::toJSONString($databases) . ' } ';
	}
	
	function returnListOfTables()
	{
		$databases = array();
		$databases[] = array("tableName" => "Table1");
		$databases[] = array("tableName" => "Table2");
		$databases[] = array("tableName" => "Table3");
		
		echo '{ "tables" : ' . self::toJSONString($databases) . ' } ';
	}
	
	/**
	 * Convert to a JSON string
     * @return string The row formatted in JSON
     */
	static function toJSONString(Array $array)
	{
		return json_encode(self::utf8EncodeArray($array));
	}
	
	static protected function utf8EncodeArray(Array $array)
	{
		foreach ($array as $key => $value)
		{
			if (is_array($value))
			{
				$array[$key] = self::utf8EncodeArray($value);
			}
			else
			{
				$array[$key] = utf8_encode($value);
			}
		}

		return $array;
	}
	
}
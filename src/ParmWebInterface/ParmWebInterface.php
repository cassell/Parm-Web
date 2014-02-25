<?php

namespace ParmWebInterface;

class ParmWebInterface
{
	private $config = array();
	
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
				
				case 'generate': $this->generateDatabase(filter_input(INPUT_POST,'database')); break;
				
				case 'tables':	$this->returnListOfTables(filter_input(INPUT_POST,'database')); break;
				
				case 'table':	$this->returnTableInfo(filter_input(INPUT_POST,'database'),filter_input(INPUT_POST,'table')); break;
				
				
				
			endswitch;
			
			
		}
		else
		{
			$page = new Page\ParmWebInterfacePage();
			$page->insertJavascriptData($this->getDatabases(), 'config');
			
			// js
			$scripts = array();
			$scripts[] = dirname(dirname(__FILE__)) . '/assets/js/jquery.js';
			$scripts[] = dirname(dirname(__FILE__)) . '/assets/js/handlebars.js';
			$scripts[] = dirname(dirname(__FILE__)) . '/assets/js/ember.js';
			$scripts[] = dirname(dirname(__FILE__)) . '/assets/js/parm.js';

			foreach($scripts as $script)
			{
				// ember.js causes an error with </script>
				$page->insertJavaScriptBlock(str_replace("</script>","</ script>",file_get_contents($script)));
			}

			// css
			$css = array();
			$css[] = dirname(dirname(__FILE__)) . '/assets/css/bootstrap.css';
			$css[] = dirname(dirname(__FILE__)) . '/assets/css/parm.css';
			foreach($css as $styleSheet)
			{
				$page->insertStyleBlock(file_get_contents($styleSheet));
			}
			
			// templates
			$templates[] = dirname(dirname(__FILE__)) . '/assets/templates/index.template';
			$templates[] = dirname(dirname(__FILE__)) . '/assets/templates/database.template';
			$templates[] = dirname(dirname(__FILE__)) . '/assets/templates/databaseGenerate.template';
			$templates[] = dirname(dirname(__FILE__)) . '/assets/templates/table.template';
			$templates[] = dirname(dirname(__FILE__)) . '/assets/templates/creation.template';
			$templates[] = dirname(dirname(__FILE__)) . '/assets/templates/extended.template';
			$templates[] = dirname(dirname(__FILE__)) . '/assets/templates/structure.template';
			
			$page->open();
			
			foreach($templates as $template)
			{
				echo file_get_contents($template);
			}
			
			$page->close();
			
		}
		
		
		

		
	}
	
	private function getDatabases()
	{
		$databases = array();
		foreach(array_keys($this->config) as $dbName)
		{
			$databases[] = array("databaseName" => $dbName);
		}
		return $databases;
		
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
	
	function returnListOfTables($databaseName)
	{
		$dp = new \Parm\DatabaseProcessor($this->config[$databaseName]["database"]->getMaster());
		$dp->setSQL('SHOW TABLES');
		
		$tableNames = array();
		
		$dp->process(function($row) use(&$tableNames,$databaseName) {
			
			$tableNames[] = array("tableName" => $row['Tables_in_'.$databaseName], "databaseName" => $databaseName);
		});
		
		echo '{ "tables" : ' . self::toJSONString($tableNames) . ' } ';
	}
	
	function generateDatabase($databaseName)
	{
		$this->config[$databaseName]["generator"]->generate();
				
		echo '{ "success" : 1 }';
	}
	
	function returnTableInfo($databaseName,$tableName)
	{
		$tableData = $this->config[$databaseName]["generator"]->getTemplatingDataFromTableName($tableName);

		echo '{ "databaseName" : "' . $databaseName . '", "tableName" : "' . $tableName . '", "info" : ' . self::toJSONString($tableData) . ' }';
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
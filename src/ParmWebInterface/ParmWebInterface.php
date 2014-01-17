<?php

namespace ParmWebInterface;

class ParmWebInterface
{
	private $config;
	
	function __construct(Array $config)
	{
		$this->config = $config;
	}
	
	function init()
	{
		if(array_key_exists('R', $_POST) && filter_input('R', $_POST) == "AJAX")
		{
			// this is a JSON request for an API call
		}
		else
		{
			$page = new Page\ParmWebInterfacePage();
			$page->open();
			
			
			
			$page->close();
		}
		
		
		

		
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
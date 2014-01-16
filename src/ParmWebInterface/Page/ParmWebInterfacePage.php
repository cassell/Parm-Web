<?php

namespace ParmWebInterface\Page;

class ParmWebInterfacePage extends HtmlPage
{
	
	function getScripts()
	{
		$scripts = $this->scripts;
		
		$this->scripts = array();
		
		$scriptContent = "";
		
		foreach($scripts as $script)
		{
			$scriptContent .= "\n\n\n";

			//$folder = str_replace("/scripts/release/build/".basename(__FILE__),"",__FILE__);

			//echo file_get_contents($folder.$script);

		}
		
		$this->insertJavaScriptBlock($scriptContent);
	}




	
}
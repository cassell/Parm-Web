<?php

namespace ParmWebInterface\Page;

class ParmWebInterfacePage extends HtmlPage
{
	
	function __construct()
	{
		
		// js
		$scripts = array();
		$scripts[] = dirname(dirname(dirname(__FILE__))) . '/assets/js/jquery.js';
		foreach($scripts as $script)
		{
			$this->insertJavaScriptBlock(file_get_contents($script));
		}
		
		// css
		$css = array();
		$css[] = dirname(dirname(dirname(__FILE__))) . '/assets/css/bootstrap.css';
		$css[] = dirname(dirname(dirname(__FILE__))) . '/assets/css/parm.css';
		foreach($css as $styleSheet)
		{
			$this->insertStyleBlock(file_get_contents($styleSheet));
		}
		
		
	}
	
	function open()
	{
		$this->printHtmlHeader();
		
		echo '<div id="parm-header" class="container clearfix">';
		
			echo '<div id="parm-logo">';
				echo '<a href=""><img src="data:image/png;base64,' . base64_encode(file_get_contents(dirname(dirname(dirname(__FILE__))).'/assets/img/parm-logo-small.png')).'"></a>';
			echo '</div>';
			
			echo '<div id="parm-search">';
				echo '<div class="input-group">';
					echo '<input type="text" class="form-control">';
					echo '<span class="input-group-btn">';
						echo '<button class="btn btn-default" type="button">Search</button>';
					echo '</span>';
				echo '</div>';
			echo '</div>';
		
		echo '</div>';
		
		echo '<div id="parm-body" class="container clearfix">';
		
		echo '</div>';
		
		echo '<div id="parm-footer" class="container clearfix">';
			echo '<div class="row">';
				echo '<div class="col-lg-6">';
					echo '<p>&copy; <a href="http://www.andrewcassell.com">Andrew Cassell</a></p>';
				echo '</div>';
			
			echo '</div>';
		echo '</div>';
		
	}
	
	function close()
	{
		$this->printHtmlFooter();
	}
	


	
}
<?php

namespace ParmWebInterface\Page;

class ParmWebInterfacePage extends HtmlPage
{
	function __construct()
	{
		
	}
	
	function display()
	{
		$this->open();
		$this->close();
	}
	
	function open()
	{
		$this->printHtmlHeader();
		
		echo '<div id="parm-header" class="container clearfix">';
		
			echo '<div id="parm-logo">';
				echo '<a href=""><img src="data:image/png;base64,' . base64_encode(file_get_contents(dirname(dirname(dirname(__FILE__))).'/assets/img/parm-logo-small.png')).'"></a>';
			echo '</div>';
			
//			echo '<div id="parm-search">';
//				echo '<div class="input-group">';
//					echo '<input type="text" class="form-control">';
//					echo '<span class="input-group-btn">';
//						echo '<button class="btn btn-default" type="button">Search</button>';
//					echo '</span>';
//				echo '</div>';
//			echo '</div>';
		
		echo '</div>';
		
		echo '<div id="parm-body" class="container clearfix">';
		
		echo '</div>';
		
		echo '<div id="parm-footer" class="container clearfix">';
			echo '<div class="row">';
				echo '<div class="col-lg-12">';
					echo '<p>&copy; <a href="http://www.andrewcassell.com">Andrew Cassell</a>. View this project on <a href="https://github.com/cassell/Parm">Github</a>. Built with <a href="http://getbootstrap.com/">Bootstrap</a>, <a href="http://emberjs.com/">Ember.js</a>, and <a href="http://jquery.com/">jQuery</a>.</p>';
				echo '</div>';
			
			echo '</div>';
		echo '</div>';
		
	}
	
	function close()
	{
		$this->printHtmlFooter();
	}
	


	
}
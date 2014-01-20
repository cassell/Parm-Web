<?php

namespace ParmWebInterface\Page;

class ParmWebInterfacePage extends HtmlPage
{
	private $templates = array();
	
	function __construct()
	{
		// js
		$scripts = array();
		$scripts[] = dirname(dirname(dirname(__FILE__))) . '/assets/js/jquery.js';
		$scripts[] = dirname(dirname(dirname(__FILE__))) . '/assets/js/handlebars.js';
		$scripts[] = dirname(dirname(dirname(__FILE__))) . '/assets/js/ember.js';
		$scripts[] = dirname(dirname(dirname(__FILE__))) . '/assets/js/parm.js';
		
		foreach($scripts as $script)
		{
			// ember.js causes an error with </script>
			$this->insertJavaScriptBlock(str_replace("</script>","</ script>",file_get_contents($script)));
		}
		
		// css
		$css = array();
		$css[] = dirname(dirname(dirname(__FILE__))) . '/assets/css/bootstrap.css';
		$css[] = dirname(dirname(dirname(__FILE__))) . '/assets/css/parm.css';
		foreach($css as $styleSheet)
		{
			$this->insertStyleBlock(file_get_contents($styleSheet));
		}
		
		// templates
		$this->templates[] = dirname(dirname(dirname(__FILE__))) . '/assets/templates/index.template';
		$this->templates[] = dirname(dirname(dirname(__FILE__))) . '/assets/templates/database.template';
		
	}
	
	function display()
	{
		$this->open();
		$this->close();
	}
	
	function open()
	{
		$this->printHtmlHeader();
		
		foreach($this->templates as $template)
		{
			echo file_get_contents($template);
		}
		
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
					echo '<p>&copy; <a href="http://www.andrewcassell.com">Andrew Cassell</a>. View this project on <a href="https://github.com/cassell/SQLicious">Github</a>. Built with <a href="http://twitter.github.com/bootstrap/">Bootstrap</a>, <a href="http://emberjs.com/">Ember.js</a>, and <a href="http://jquery.com/">jQuery</a>. Icons from <a href="http://fortawesome.github.com/Font-Awesome/">Font&nbsp;Awesome</a></p>';
				echo '</div>';
			
			echo '</div>';
		echo '</div>';
		
	}
	
	function close()
	{
		$this->printHtmlFooter();
	}
	


	
}
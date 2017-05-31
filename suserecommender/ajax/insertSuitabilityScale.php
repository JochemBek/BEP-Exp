<?php

	require 'medoo.min.php';

	$database = new medoo();
	
	$data = $database->insert("suitabilityscale",array(

			"userId" 				=> $_POST['userId'],
			"conditie"			=> $_POST['conditie'],
			"screen" 				=> $_POST['screen'],
			"advisor" 			=> $_POST['advisor'],
			"first"					=> $_POST['first'],
			"second"				=> $_POST['second'],
			"third"		 			=> $_POST['third'],
      "mostSuitable"  => $_POST['mostSuitable'],
      "averageSuitable" => $_POST['averageSuitable'],
      "leastSuitable" => $_POST['leastSuitable'],
      
	));

?>
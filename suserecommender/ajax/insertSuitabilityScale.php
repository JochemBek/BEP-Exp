<?php

	require 'medoo.min.php';

	$database = new medoo();
	
	$data = $database->insert("suitabilityscale",array(

			"userId" 				=> $_POST['userId'],
			"conditie"				=> $_POST['conditie'],
			"screen" 				=> $_POST['screen'],
      "mostSuitable" => $_POST['mostSuitable'],
      "averageSuitable" => $_POST['averageSuitable'],
      "leastSuitable" => $_POST['leastSuitable'],
      
	));

?>
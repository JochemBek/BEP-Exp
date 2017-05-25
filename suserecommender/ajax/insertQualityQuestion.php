<?php

	require 'medoo.min.php';

	$database = new medoo();
	
	$data = $database->insert("qualityquestions",array(

			"userId" 				=> $_POST['userId'],
			"conditie"				=> $_POST['conditie'],
			"screen" 				=> $_POST['screen'],
      "questionId" => $_POST['questionId'],
      "value" => $_POST['value'],
			"nrInOrder" => $_POST['nrInOrder'],
      
	));

?>
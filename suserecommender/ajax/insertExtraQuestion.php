<?php

	require 'medoo.min.php';

	$database = new medoo();
	
	$data = $database->insert("extraquestions",array(

			"userId" 				=> $_POST['userId'],
			"conditie"				=> $_POST['conditie'],
			"screen" 				=> $_POST['screen'],
      "questionId" => $_POST['questionId'],
			"atPlace"		=> $_POST['atPlace'],
      "mailAlreadyNeither" => $_POST['mailAlreadyNeither'],
      
	));

?>
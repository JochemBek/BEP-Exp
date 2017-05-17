<?php

	require 'medoo.min.php';

	$database = new medoo();
	
	$data = $database->insert("usersatisfaction_soc",array(

			"userId" 				=> $_POST['userId'],
			"questionId"			=> $_POST['questionId'],
			"value" 				=> $_POST['value'],

	));

?>
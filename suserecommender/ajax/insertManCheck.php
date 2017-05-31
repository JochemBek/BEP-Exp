<?php

	require 'medoo.min.php';

	$database = new medoo();
	
	$data = $database->insert("mancheck",array(

			"userId" 				=> $_POST['userId'],
			"conditie"				=> $_POST['conditie'],
			"value" => $_POST['value'],
      "advis" => $_POST['advis'],
			"questionId" => $_POST['questionId'],
			"order" => $_POST['order'],
      
	));

?>
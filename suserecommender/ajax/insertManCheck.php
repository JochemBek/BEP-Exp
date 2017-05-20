<?php

	require 'medoo.min.php';

	$database = new medoo();
	
	$data = $database->insert("mancheck",array(

			"userId" 				=> $_POST['userId'],
			"conditie"				=> $_POST['conditie'],
			"value" => $_POST['value'],
      "isExpert" => $_POST['isExpert'],
			"questionId" => $_POST['questionId'],

      
	));

?>
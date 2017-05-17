<?php

	require 'medoo.min.php';

	$database = new medoo();
	
	$database->insert("measures",[
		"id" => 80,
		"description" => 'Hu!'
	]);

	$max = $database->max("users",'id');
	
	$database->insert("users",[
			"id"			=> $max+1,
			"conditie" 		=> $_POST['conditie']
	]);
	
	echo $max+1;

?>
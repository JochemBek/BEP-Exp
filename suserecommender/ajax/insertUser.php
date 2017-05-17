<?php

	require 'medoo.min.php';

	$database = new medoo();

	$max = $database->max("users_soc",'id');
	
	$data = $database->insert("users_soc",array(

			"id"			=> $max+1,
			"facebookId"	=> $_POST['facebookId'],
			"email"			=> $_POST['email'],
			"gender"		=> $_POST['gender'],
			"conditie" 		=> $_POST['conditie'],
			
	));
	
	echo $max+1;

?>
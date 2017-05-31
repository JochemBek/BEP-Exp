<?php

	require 'medoo.min.php';

	$database = new medoo();

	$max = $database->max("users",'id');

	$database->insert("users",[
			"id"			=> $max+1,
			"conditie" 		=> $_POST['conditie'],
			"tid"			=> $_POST['tid'],
	]);

	echo $max+1;

?>

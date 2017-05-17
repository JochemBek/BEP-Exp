<?php

	require 'medoo.min.php';

	$database = new medoo();

	$data = $database->insert("userfriends_soc",array(

			"facebookId"	=> $_POST['facebookId'],
			"friendId"		=> $_POST['friendId'],
			"friendName"	=> $_POST['friendName'],
			"score" 		=> $_POST['score'],
			
	));

?>
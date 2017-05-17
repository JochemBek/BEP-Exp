<?php

	require 'medoo.min.php';

	$database = new medoo();

	$data = $database->insert("usersextra_soc",array(

			"userId"			=> $_POST["userId"],
			"ability" 			=> $_POST["ability"],
			"woonsituatie"		=> $_POST["woonsituatie"],
			"leeftijd"			=> $_POST["leeftijd"],
			"opleiding"			=> $_POST["opleiding"],
			"man"				=> $_POST["man"],
			"inkomen"			=> $_POST["inkomen"],
			"interested"		=> $_POST["interested"],
			"email"				=> $_POST["email"],
			"emailSent"			=> $_POST["emailSent"],
			"consent"			=> $_POST["consent"],
			"comments"			=> $_POST["comments"],

	));

?>
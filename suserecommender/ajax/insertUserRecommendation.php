<?php

	require 'medoo.min.php';

	$database = new medoo();
	
	$data = $database->insert("userrecommendation_soc",array(

			"userId" 			=> $_POST['userId'],
			"measureId"			=> $_POST['measureId'],
			"answerPost" 		=> $_POST['answerPost'],

	));

?>
<?php

	require 'medoo.min.php';

	$database = new medoo();
	
	$data = $database->insert("userNewMeasure",array(

			"userId" 		=> $_POST['userId'],
			"measureId"		=> $_POST['measureId'],
			"answerPre" 	=> $_POST['answerPre'],

	));

?>
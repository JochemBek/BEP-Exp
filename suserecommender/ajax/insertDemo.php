<?php

	require 'medoo.min.php';

	$database = new medoo();
  
  $data = $database->insert("demographics",array(

      "userId"			=> $_POST['userId'],
      "conditie" 		=> $_POST['conditie'],
      "email" 		=> $_POST['email'],
      "leeftijd" 		=> $_POST['leeftijd'],
      "opleiding" 		=> $_POST['opleiding'],
      "man" 		=> $_POST['man'],
			"woon" 		=> $_POST['woon'],
			"inkomen" 		=> $_POST['inkomen'],
      
	));

?>
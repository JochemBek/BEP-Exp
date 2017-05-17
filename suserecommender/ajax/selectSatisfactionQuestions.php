<?php

	require 'medoo.min.php';

	$database = new medoo();

	$data = $database->select("satisfactionquestions","*");

	echo json_encode($data);

?>
<?php

	require 'medoo.min.php';

	$database = new medoo();

	$data = $database->select("newmeasures","*");

	echo json_encode($data);

// werkt nog wel, maar nu niet relevant (NewMeasures == 0)

?>
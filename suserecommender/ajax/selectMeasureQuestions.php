<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "vlabnl_eb";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT * FROM measurequestions";
	$data = $conn->query($sql);

	$conn->close();

	echo json_encode($data);

?>


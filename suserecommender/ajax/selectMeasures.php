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

	$sth = mysqli_query($conn, "SELECT * FROM measures");
	$rows = array();
	while($r = mysqli_fetch_assoc($sth)) {
	    $rows[] = $r;
	}
	print json_encode($rows);
	
	
	$conn->close();
?>
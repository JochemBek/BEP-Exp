<?php

  require 'medoo.min.php';

  $database = new medoo();
  
  $data = $database->insert("userselection_soc",array(

      "userId"          => $_POST['userId'],
      "ability"         => $_POST['ability'],
      "measureId"       => $_POST['measureId'],
      "choice"        	=> $_POST['choice'],

  ));

?>
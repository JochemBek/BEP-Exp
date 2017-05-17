<?php

  require 'medoo.min.php';

  $database = new medoo();
  
  $data = $database->insert("trackhover_soc",array(

      "userId"          => $_POST['userId'],
      "ability"         => $_POST['ability'],
      "measureId"       => $_POST['measureId'],
      "hoverIn"         => $_POST['hoverIn'],

  ));

?>
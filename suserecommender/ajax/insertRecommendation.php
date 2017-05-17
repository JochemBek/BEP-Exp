<?php

  require 'medoo.min.php';

  $database = new medoo();
  
  $data = $database->insert("recommendation_soc",array(

      "userId"      => $_POST['userId'],
      "ability"     => $_POST['ability'],
      "measureId"   => $_POST['measureId'],
      "position"    => $_POST['position'],
      "conditie"		=> $_POST['conditie'],
      "friends"			=> $_POST['friends'],

  ));

?>
<?php

  require 'medoo.min.php';

  $database = new medoo();
  
  $data = $database->insert("useralles",array(

      "userId"          => $_POST['userId'],
      "ability"         => $_POST['ability'],
      "abilityScaled"   => $_POST['abilityScaled'],
      "woonsituatie"    => $_POST['woonsituatie'],
      "leeftijd"        => $_POST['leeftijd'],
      "opleiding"       => $_POST['opleiding'],
      "man"             => $_POST['man'],
      "measureId"       => $_POST['measureId'],
      "difficulty"      => $_POST['difficulty'],
      "answerPost"      => $_POST['answerPost'],
      "startPosition"   => $_POST['startPosition'],
      "comments"        => $_POST['comments'],

  ));

?>
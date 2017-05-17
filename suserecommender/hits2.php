<?php
// 	mlwebdb.inc.php: db settings for MouselabWEB 
//
//       v 1.00beta, Aug 2008
//		(identical to version 0.97.1/0.98/0.99, from 2004)
//     (c) 2003-2008 Martijn C. Willemsen and Eric J. Johnson 
//
//    This program is free software; you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation; either version 2 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program; if not, write to the Free Software
//    Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

$DBhost = "mysql02.totaalholding.nl"; 		// hostname of the mySQL database 
$DBuser = "vlabnl_eb"; 		// username of user on this database
$DBpass = "0P405";		// user password
$DBName = "vlabnl_eb";			// name of the database
$table = "mlweb";			// name of the table containing MLWEB Data (can be left to mlweb)

mysql_connect($DBhost,$DBuser,$DBpass) or die("Unable toconnect to database");
@mysql_select_db("$DBName") or die("Unable to select database $DBName"); 

$sqlquery = "SELECT count(distinct userId) FROM `usermeasure_soc` where time > '2015-03-21'";
$result = mysql_query($sqlquery);
$raschsoc = mysql_result($result,0);
$sqlquery = "SELECT count(distinct userId) FROM `usermeasure_list` where time > '2015-03-21'";
$result = mysql_query($sqlquery);
$raschlist = mysql_result($result,0);

$sqlquery = "SELECT count(distinct userId) FROM `userrecommendation_soc` where time > '2015-03-21'";
$result = mysql_query($sqlquery);
$recsoc = mysql_result($result,0);
$sqlquery = "SELECT count(distinct userId) FROM `userrecommendation_list` where time > '2015-03-21'";
$result = mysql_query($sqlquery);
$reclist = mysql_result($result,0);


$sqlquery = "SELECT count(distinct userId) FROM `usersatisfaction_soc` where time > '2015-03-21'";
$result = mysql_query($sqlquery);
$satsoc = mysql_result($result,0);
$sqlquery = "SELECT count(distinct userId) FROM `usersatisfaction_list` where time > '2015-03-21'";
$result = mysql_query($sqlquery);
$satlist = mysql_result($result,0);

$sqlquery = "SELECT count(distinct userId) FROM `usersextra_soc` where time > '2015-03-21'";
$result = mysql_query($sqlquery);
$countsoc = mysql_result($result,0);
$sqlquery = "SELECT count(distinct userId) FROM `usersextra_list` where time > '2015-03-21'";
$result = mysql_query($sqlquery);
$countlist = mysql_result($result,0);
mysql_close();
?>
<html><body>
<p>aantal hits vanaf 21 maart</p>
<table border=1>
<tr><th>experiment</th><th>rasch gedaan</th><th>keuze gemaakt</th><th>enquete (satisfaction) ingevuld</th><th>eind gehaald</th></tr>
<tr><td>social</td><td><?php echo($raschsoc);?></td><td><?php echo($recsoc);?></td><td><?php echo($satsoc);?></td><td><?php echo($countsoc);?></td></tr>
<tr><td>list</td><td><?php echo($raschlist);?></td><td><?php echo($reclist);?></td><td><?php echo($satlist);?></td><td><?php echo($countlist);?></td></tr>
<table>

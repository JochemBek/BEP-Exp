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

$sqlquery = "SELECT count(userId) FROM `usersextra_soc` where time > '2015-03-21'";
$result = mysql_query($sqlquery);
$countsoc = mysql_result($result,0);
$sqlquery = "SELECT count(userId) FROM `usersextra_list` where time > '2015-03-21'";
$result = mysql_query($sqlquery);
$countlist = mysql_result($result,0);
mysql_close();
?>
<html><body>
<p>number of hits Social from March 21: <?php echo($countsoc);?></p>
<p>number of hits List (order) from March 21: <?php echo($countlist);?></p>

<?php
function getConnection() {
	$dbhost="adapnet.com";
	$dbuser="adapn553";
	$dbpass="adapnet.123$%";
	$dbname="adapn553_demo_gestamp";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}
?>
<?php
require 'connector.php';
require 'Slim/Slim.php';


\Slim\Slim::registerAutoloader();
$app=new \Slim\Slim();
$app->config('debug', false);
$app->response()->header('Content-Type', 'application/json;charset=utf-8');
/*$app->get('/services/', 'getservices');
$app->get('/services/:id',	'getService');*/
$app->get('/orders/','getOrders');
$app->post('/orders/', 'addOrder');
/*$app->put('/services/:id', 'updateService');
$app->delete('/services/:id',	'deleteService');
*/
$app->run();

function getOrders() {
	$sql = "select * FROM view_orders";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->execute(); 
		$orders = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo utf8_decode('{"order": ' . json_encode($orders) . '}');
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
function addOrder() {
	$request = \Slim\Slim::getInstance()->request();
	$order = json_decode($request->getBody());
	$sql = "INSERT INTO `orders`(`name`,`email`,`observations`,`id_article`,`id_user`,`datetime`) VALUES (:name,:email,:observations,:id_article,:id_user,now());";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $order->name);
		$stmt->bindParam("email", $order->email);
		$stmt->bindParam("observations", $order->observations);
		$stmt->bindParam("id_article", $order->id_article);
		$stmt->bindParam("id_user", $order->id_user);
		$stmt->execute();
		$order->id = $db->lastInsertId();
		$db = null;
		echo json_encode($order); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
/*
function updateService($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$service = json_decode($body);
	$sql = "UPDATE services SET title=:title, price=:price, checked=:checked WHERE id_service=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("title", $service->title);
		$stmt->bindParam("price", $service->price);
		$stmt->bindParam("checked", $service->checked);
		$stmt->bindParam("id_service", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($service); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteService($id) {
	$sql = "DELETE FROM services WHERE id_service=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($query) {
	$sql = "SELECT * FROM services WHERE UPPER(title) LIKE :query ORDER BY title";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$services = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($services);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}*/
/*
function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="backbone";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}*/

?>
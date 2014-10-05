<?php
$mysqli = new mysqli("localhost", "root", "", "cusquena");
header('Content-Type: application/json');
$dni = $_POST["dni"];
$result = $mysqli->query("SELECT * FROM cusquena_user WHERE dni = " . $dni);
$row = $result->fetch_assoc();
if (!$row['cumpleanos'] == null){
	echo json_encode(array('cumpleanos' => $row['cumpleanos']));exit;
}else{
	echo json_encode(array('success' => "DNI no existe");exit;
}
?>


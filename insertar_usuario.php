<?php
header('Content-Type: application/json');
$dni = $_POST["dni"];
$nombre = $_POST["nombre"];
$apellido_paterno = $_POST["apellido_paterno"];
$apellido_materno = $_POST["apellido_materno"];
$dia = $_POST["dia"];
$mes = $_POST["mes"];
$ano = $_POST["ano"];
$email = $_POST["email"];
$cell = $_POST["cell"];

$regex_dni = "/^[0-9\-\+]{9,9}$/";
$regex_name = "/^[a-zA-Z]{1,}([\s-]*[a-zA-Z\s\'-]*)$/";
$regex_email = "/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/"; 
if ( preg_match($regex_email, $email) && 
	!preg_match($regex_name, $nombre) && 
	!preg_match($regex_name, $apellido_paterno) && 
	!preg_match($regex_name, $apellido_materno) && 
	preg_match( $regex_dni, $dni )) { 
	 echo json_encode(array('error' => "Datos Invalidos"));exit;
}
$mysqli = new mysqli("localhost", "root", "", "cusquena");
if ($mysqli->connect_errno) {
    echo json_encode(array('error' => "Hay ocurrido un error"));exit;
}else{
	$domnio = saca_dominio($_SERVER['HTTP_REFERER']);
	if($domnio == "facebook.com" || $domnio == "localhost"){
		$result = $mysqli->query("SELECT * FROM cusquena_user WHERE dni = " . $dni);
		$row = $result->fetch_assoc();
		if (!$row['cumpleanos'] == null){
	    	echo json_encode(array('cumpleanos' => $row['cumpleanos']));exit;
		}else{
			$query = "INSERT INTO cusquena_user VALUES (Default,'$nombre', '$apellido_paterno', '$apellido_materno', '" . $ano . "-" . $mes . "-" . $dia . "', $dni, '$email', $cell)";
			$mysqli->query($query);
			$mensaje =  "usuario registrado correctamente";
		    echo json_encode(array('success' => $mensaje));exit;
		}
	}else{
		echo json_encode(array('error' => "error en domnio"));exit;
	}
}
function saca_dominio($url){
    $protocolos = array('http://', 'https://', 'ftp://', 'www.');
    $url = explode('/', str_replace($protocolos, '', $url));
    return $url[0];
}
?>


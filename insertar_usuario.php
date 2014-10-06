<?php
header('Content-Type: application/json');

$nombre = filter_input(INPUT_POST, 'nombre', FILTER_SANITIZE_STRING);
$apellido_paterno = filter_input(INPUT_POST, 'apellido_paterno', FILTER_SANITIZE_STRING);
$apellido_materno = filter_input(INPUT_POST, 'apellido_materno', FILTER_SANITIZE_STRING);
$dia = filter_input(INPUT_POST, 'dia', FILTER_SANITIZE_NUMBER_INT);
$mes = filter_input(INPUT_POST, 'mes', FILTER_SANITIZE_NUMBER_INT);
$ano = filter_input(INPUT_POST, 'ano', FILTER_SANITIZE_NUMBER_INT);
$dni = filter_input(INPUT_POST, 'dni', FILTER_SANITIZE_NUMBER_INT);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
$cell = filter_input(INPUT_POST, 'cell', FILTER_SANITIZE_NUMBER_INT);

$regex_name = "/^[a-zA-Z]{1,}([\s-]*[a-zA-Z\s\'-]*)$/";
$regex_dni = "/^[0-9]{8}$/";
$regex_email = "/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/";
$regex_cell = "/^[0-9]{9}$/";
if (
        !preg_match($regex_name, $nombre) &&
        !preg_match($regex_name, $apellido_paterno) &&
        !preg_match($regex_name, $apellido_materno) &&
        !checkdate($mes, $dia, $ano) &&
        !preg_match($regex_dni, $dni) &&
        !filter_var($email, FILTER_VALIDATE_EMAIL) &&
        !preg_match($regex_cell, $cell)
    ) {
    echo json_encode(array('error' => "Datos Invalidos."));
    exit;
}

function get_domain($url) {
    $protocolos = array('http://', 'https://', 'www.');
    $url_parts = explode('/', str_replace($protocolos, '', $url));
    return $url_parts[0];
}
$domain = get_domain(filter_input(INPUT_SERVER, 'HTTP_REFERER'));
if ($domain !== "facebook.com" && $domain !== "localhost") {
    echo json_encode(array('error' => "Acceso no permitido."));
    exit;
}

$mysqli = new mysqli("localhost", "root", "", "cusquena");
if ($mysqli->connect_errno) {
    echo json_encode(array('error' => "Error de Conexión."));
    exit;
}
$result = $mysqli->query("SELECT * FROM cusquena_user WHERE dni = " . $dni);
$row = $result->fetch_assoc();
if (!$row['cumpleanos'] == null) {
    echo json_encode(array('cumpleanos' => $row['cumpleanos']));
    exit;
}
$query = "INSERT INTO cusquena_user VALUES (Default,'$nombre', '$apellido_paterno', '$apellido_materno', '" . $ano . "-" . $mes . "-" . $dia . "', $dni, '$email', $cell)";
$mysqli->query($query);
$mensaje = "Datos guardados satisfactoriamente.";
echo json_encode(array('success' => $mensaje));
exit;

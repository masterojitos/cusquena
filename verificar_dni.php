<?php
header('Content-Type: application/json');
$dni = filter_input(INPUT_POST, 'dni', FILTER_SANITIZE_NUMBER_INT);

$regex_dni = "/^[0-9]{8}$/";
if (!preg_match($regex_dni, $dni)) {
    echo json_encode(array('error' => "Datos invalidos."));
    exit;
}

function get_domain($url) {
    $protocolos = array('http://', 'https://', 'www.');
    $url_parts = explode('/', str_replace($protocolos, '', $url));
    return $url_parts[0];
}
$domain = get_domain(filter_input(INPUT_SERVER, 'HTTP_REFERER'));
if ($domain !== "facebook.com" && $domain !== "teclalabs.com" && $domain !== "localhost") {
    echo json_encode(array('error' => "Acceso no permitido."));
    exit;
}

$mysqli = new mysqli("localhost", "root", "", "cusquena");
if ($mysqli->connect_errno) {
    echo json_encode(array('error' => "Error de conexión."));
    exit;
}
$result = $mysqli->query("SELECT * FROM cusquena_user WHERE dni = " . $dni);
$row = $result->fetch_assoc();
if ($row['birthdate'] !== NULL) {
    echo json_encode(array('cumpleanos' => $row['birthdate']));exit;
} else {
    echo json_encode(array('success' => "El usuario no existe."));exit;
}

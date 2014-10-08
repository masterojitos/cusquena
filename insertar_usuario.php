<?php
require_once 'config.php';
header('Content-Type: application/json; charset=utf-8');

$dni = filter_input(INPUT_POST, 'dni', FILTER_SANITIZE_NUMBER_INT);
$fb_data = filter_input(INPUT_POST, 'facebook', FILTER_SANITIZE_STRING);
$nombre_mesa = filter_input(INPUT_POST, 'nombre_mesa', FILTER_SANITIZE_STRING);
parse_str($fb_data, $fb_data);

$regex_dni = "/^[0-9]{8}$/";
if (
        !preg_match($regex_dni, $dni) || 
        !is_array($fb_data) || 
        empty($nombre_mesa)
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
if (!in_array($domain, $cusquena_config['allowed_domains'])) {
    echo json_encode(array('error' => "Acceso no permitido."));
    exit;
}

$mysqli = new mysqli($cusquena_config['database']['server_name'], $cusquena_config['database']['username'], $cusquena_config['database']['password'], $cusquena_config['database']['name_db']);
if ($mysqli->connect_errno) {
    echo json_encode(array('error' => "Error de Conexión."));
    exit;
}

$foto_compartida = 'userfiles/' . $dni . '.jpg';
$query = "UPDATE cusquena_user SET `fb_id` = '" . $fb_data['id'] . "', `fb_data` = '" . json_encode($fb_data) . "', "
        . "`invited_friends` = '" . json_encode($fb_data['friends']) . "', `board_name` = '" . $nombre_mesa . "', "
        . "`shared_picture` = '" . $foto_compartida . "', `in_campaign` = 1 WHERE dni = " . $dni;
$mysqli->query($query);

$background = imagecreatefromjpeg("img/mesa-post-2.jpg");
$photo1 = imagecreatefromjpeg($fb_data['picture']);
imagecopy($background, $photo1, 85, 25, 0, 0, 100, 100);
$photo2 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][0] . "/picture?width=100&height=100");
imagecopy($background, $photo2, 266, 25, 0, 0, 100, 100); 
$photo3 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][1] . "/picture?width=100&height=100");
imagecopy($background, $photo3, 444, 25, 0, 0, 100, 100); 
$photo4 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][2] . "/picture?width=100&height=100");
imagecopy($background, $photo4, 622, 25, 0, 0, 100, 100); 
$photo5 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][3] . "/picture?width=100&height=100");
imagecopy($background, $photo5, 85, 280, 0, 0, 100, 100); 
$photo6 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][4] . "/picture?width=100&height=100");
imagecopy($background, $photo6, 266, 280, 0, 0, 100, 100); 
$photo7 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][5] . "/picture?width=100&height=100");
imagecopy($background, $photo7, 445, 280, 0, 0, 100, 100); 
$photo8 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][6] . "/picture?width=100&height=100");
imagecopy($background, $photo8, 622, 280, 0, 0, 100, 100);
imagejpeg($background, $foto_compartida);
imagedestroy($background);
imagedestroy($photo1);imagedestroy($photo2);imagedestroy($photo3);imagedestroy($photo4);
imagedestroy($photo5);imagedestroy($photo6);imagedestroy($photo7);imagedestroy($photo8);
exit;
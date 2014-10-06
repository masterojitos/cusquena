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
$notificaciones = filter_input(INPUT_POST, 'notificaciones', FILTER_SANITIZE_NUMBER_INT);
$fb_data = filter_input(INPUT_POST, 'facebook', FILTER_SANITIZE_STRING);
$nombre_mesa = filter_input(INPUT_POST, 'nombre_mesa', FILTER_SANITIZE_STRING);
parse_str($fb_data, $fb_data);

$regex_name = "/^[a-zA-Z]{1,}([\s-]*[a-zA-Z\s\'-]*)$/";
$regex_dni = "/^[0-9]{8}$/";
$regex_email = "/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/";
$regex_cell = "/^[0-9]{9}$/";
if (
        !preg_match($regex_name, $nombre) || 
        !preg_match($regex_name, $apellido_paterno) || 
        !preg_match($regex_name, $apellido_materno) || 
        !checkdate($mes, $dia, $ano) || 
        !preg_match($regex_dni, $dni) || 
        !filter_var($email, FILTER_VALIDATE_EMAIL) || 
        !preg_match($regex_cell, $cell) || 
        ($notificaciones !== '0' && $notificaciones !== '1') || 
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
if ($domain !== "facebook.com" && $domain !== "teclalabs.com" && $domain !== "localhost" && $domain !== "cusquena.dev") {
    echo json_encode(array('error' => "Acceso no permitido."));
    exit;
}

$mysqli = new mysqli("localhost", "root", "root", "cusquena");
if ($mysqli->connect_errno) {
    echo json_encode(array('error' => "Error de Conexión."));
    exit;
}

$foto_compartida = 'userfiles/' . $dni . '.jpg';
$query = "INSERT INTO cusquena_user(`names`, `lastname1`, `lastname2`, `birthdate`, `dni`, 
    `email`, `cellphone`, `notifications`, `fb_id`, `fb_data`, `invited_friends`, `board_name`, 
    `shared_picture`) VALUES ('$nombre', '$apellido_paterno', '$apellido_materno', "
        . "'" . $ano . "-" . $mes . "-" . $dia . "', '$dni', '$email', '$cell', '$notificaciones', "
        . "'" . $fb_data['id'] . "', '" . json_encode($fb_data) . "', '" . json_encode($fb_data['friends']) . "', "
        . "'" . $nombre_mesa . "', '" . $foto_compartida . "')";
$mysqli->query($query);

$background = imagecreatefromjpeg("img/mesa-post.jpg");
$color = imagecolorallocate($background, 254, 162, 0);
imagettftext($background, 18, 0, 400 - (strlen($nombre_mesa) * 4), 210, $color, "fonts/BebasNeue.otf", $nombre_mesa);
$photo1 = imagecreatefromjpeg($fb_data['picture']);
imagecopy($background, $photo1, 85, 299, 0, 0, 100, 100);
$photo2 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][0] . "/picture?width=100&height=100");
imagecopy($background, $photo2, 266, 299, 0, 0, 100, 100); 
$photo3 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][1] . "/picture?width=100&height=100");
imagecopy($background, $photo3, 444, 299, 0, 0, 100, 100); 
$photo4 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][2] . "/picture?width=100&height=100");
imagecopy($background, $photo4, 622, 299, 0, 0, 100, 100); 
$photo5 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][3] . "/picture?width=100&height=100");
imagecopy($background, $photo5, 85, 552, 0, 0, 100, 100); 
$photo6 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][4] . "/picture?width=100&height=100");
imagecopy($background, $photo6, 266, 552, 0, 0, 100, 100); 
$photo7 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][5] . "/picture?width=100&height=100");
imagecopy($background, $photo7, 445, 552, 0, 0, 100, 100); 
$photo8 = imagecreatefromjpeg("https://graph.facebook.com/" . $fb_data['friends'][6] . "/picture?width=100&height=100");
imagecopy($background, $photo8, 623, 552, 0, 0, 100, 100); 
imagejpeg($background, $foto_compartida);
imagedestroy($background);
imagedestroy($photo1);imagedestroy($photo2);imagedestroy($photo3);imagedestroy($photo4);
imagedestroy($photo5);imagedestroy($photo6);imagedestroy($photo7);imagedestroy($photo8);
exit;

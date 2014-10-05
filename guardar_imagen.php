<?php
$data = base64_decode($_POST["base64data"]);
list($type, $data) = explode(';', $data);
$data = base64_decode($data);

file_put_contents('image.png', $data);
?>
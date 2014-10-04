<?php
$mysqli = new mysqli("localhost", "usuario", "contraseña", "basedatos");
if ($mysqli->connect_errno) {
    echo "Fallo al contenctar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
//grabar usuario
nombre = request.POST["nombre"]
apellido_paterno = request.POST["apellido_paterno"]
apellido_materno = request.POST["apellido_materno"]
dia = request.POST["dia"]
mes = request.POST["mes"]
ano = request.POST["ano"]
dni = request.POST["dni"]
email = request.POST["email"]
cell = request.POST["cell"]
$query = "INSERT INTO cusquena_user VALUES (nombre, apellido_paterno, apellido_materno, ano + '-' + mes + '-' + dia, dni, email, cell)";
$mysqli->query($query);

//verificar existencia
dni = request.POST["dni"]
$user = $mysqli->query("SELECT fecha_nacimiento FROM cusquena_user WHERE dni = " + dni);
if ($user->num_rows){
	$mensaje = "usuario existente";
}else{
	$mensaje = "usuario no existente";
}
?>


<?php
//acceder al archivo data-1.json y devolver respuesta con get
if ($_SERVER["REQUEST_METHOD"] == "GET") {
echo file_get_contents("data-1.json");
}
//si la respuesta es de tipo post filtramos los datos del archivo
if($_SERVER["REQUEST_METHOD"] == "POST") {
	
//almacenamos las variables enviadas por post
	$userCiudad = $_POST["Ciudad"];
	$userTipo = $_POST["Tipo"];
	$userSlideIn = (int) $_POST["SlideIn"];
	$userSlideOut = (int) $_POST["SlideOut"];
	
//almacenamos contenido del archivo en una variable 
	$contenido = file_get_contents("data-1.json");
//decodificamos el archivo y lo almacenamos en una nueva variable de tipo array	
	$contArr = json_decode($contenido, false);
//almacenamos el tamaño del arreglo 
	$longArr = count($contArr);
//generamos un nuevo arreglo para ser usado para respuesta final
	$newArr = array();
// recorremos el array con un for y almacenamos atributos de obj actual
	for($x = 0; $x < $longArr; $x++){
		$actual = $contArr[$x];
		$actCiudad = $actual->Ciudad;
		$actTipo = $actual->Tipo;
		$actPrecio = $actual->Precio;
		$actPrecioAlfa = substr($actPrecio,1,2);
		$actPrecioBeta = substr($actPrecio,-3);
		$actPrecioGama = $actPrecioAlfa.$actPrecioBeta;
		if($actCiudad == $userCiudad && $actTipo == $userTipo && $actPrecioGama > $userSlideIn && $actPrecioGama < $userSlideOut){
			array_push($newArr, $actual);
		}
	}
//respondemos arreglo de objetos en formato json	
echo json_encode($newArr);

}


?>
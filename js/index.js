/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
//        this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}


//Funcion para envio de petición de lectura de archivo json con jquery ajax y modo get
  $("#mostrarTodos").click(function(){
        $.get("buscador.php", function(data, status){
			var respArr = JSON.parse(data);
			var longArr = respArr.length;
		//for para recorrer arreglo y mostrar los vaores en pantalla
			var j;
			for(j = 0; j < longArr; j++){
				var id = respArr[j].Id;
				var dir = respArr[j].Direccion;
				var ciudad = respArr[j].Ciudad;
				var tel = respArr[j].Telefono;
				var codigo = respArr[j].Codigo_Postal;
				var tipo = respArr[j].Tipo;
				var precio = respArr[j].Precio;
				var resTipo = "<div class ='itemMostrado'>"+"<ul>"+
					"<li>Dirección: "+ dir + "</li>"+
					"<li>Ciudad: "+ ciudad + "</li>"+
					"<li>Teléfono: "+ tel + "</li>"+
					"<li>Codigo: "+ codigo + "</li>"+
					"<li>Tipo: "+ tipo + "</li>"+
					"<li>Precio "+ precio + "</li>"+
					"</ul>" + "<img src='img/home.jpg'>" +
					"</div>";
				$(".colContenido").append(resTipo);
			}

        });
    });
//vamos a definir get's para ordenar las opciones y mostrarlas en pantalla
$(document).ready(function(){
        $.get("buscador.php", function(data, status){
			//borramos contenido de respuestas previas
			$("div").remove(".itemMostrado");
			var respArr = JSON.parse(data);
			var longArr = respArr.length;
			var alfaArr = [];
			var betaArr = [];	
			var j;
			for(j = 0; j < longArr; j++){
				alfaArr.push(respArr[j].Ciudad);
				betaArr.push(respArr[j].Tipo);
			}
			//ordenamos las ciudades
			alfaArr.sort();
			//aplicamos funcion para generar nuevo arreglo sin repeticiones
			alfaArr.forEach(elimReps);
			//mostramos en pantalla opciones de ciudades
			var i;
			for(i = 0; i < newArr.length; i++){
				var resOpciones = '<option value="'+newArr[i] +'">'+newArr[i] + '</option>';
				$('#selectCiudad').append(resOpciones);
			}
			
			betaArr.sort();
			betaArr.forEach(elimRepsTipo);
			
			//mostramos en pantalla opciones de Tipo
			var k
			for(k = 0; k < lastArr.length; k++){
				var resOpTipo = '<option value="'+lastArr[k] +'">'+lastArr[k] + '</option>';
				$('#selectTipo').append(resOpTipo);
			}
        });
    });

// vamos a definir una funcion para generar un nuevo arreglo sin repeticiones
var newArr = [];
function elimReps(item,index,arr){
	var nextep = arr[index+1];
	if(arr[index] != arr[arr.length] && arr[index] != nextep ){
		newArr.push(item);
	}
}

var lastArr = [];
function elimRepsTipo(item,index,arr){
	var nextep = arr[index+1];
	if(arr[index] != arr[arr.length] && arr[index] != nextep ){
		lastArr.push(item);
	}
}

inicializarSlider();
playVideoOnScroll();

//configuramos el click para la peticion con filtros especificos tipo POST
$("#submitButton").click(function(){
	//vamos a almacenar las variables necesarias para el envio mediante post
//valores de slider
var slider = $("#rangoPrecio").val().split(";");

	  //valor de ciudad
	  var ciudad = $('#selectCiudad').val();
	  //valores de tipo
	  var tipo = $('#selectTipo').val();
//	  console.log(tipo + ciudad);
	  $.post("buscador.php",
        {
          Ciudad: ciudad,
          Tipo: tipo,
		  SlideIn: slider[0],
		  SlideOut: slider[1]
        },
        function(data,status){
		  //borramos contenido de respuestas previas
		  $("div").remove(".itemMostrado");
		  //almacenamos respuesta
		  	var respArr = JSON.parse(data);
			var longArr = respArr.length;
		//for para recorrer arreglo y mostrar los vaores en pantalla
			var j;
			for(j = 0; j < longArr; j++){
				var id = respArr[j].Id;
				var dir = respArr[j].Direccion;
				var ciudad = respArr[j].Ciudad;
				var tel = respArr[j].Telefono;
				var codigo = respArr[j].Codigo_Postal;
				var tipo = respArr[j].Tipo;
				var precio = respArr[j].Precio;
				var resTipo = "<div class ='itemMostrado'>"+"<ul>"+
					"<li>Dirección: "+ dir + "</li>"+
					"<li>Ciudad: "+ ciudad + "</li>"+
					"<li>Teléfono: "+ tel + "</li>"+
					"<li>Codigo: "+ codigo + "</li>"+
					"<li>Tipo: "+ tipo + "</li>"+
					"<li>Precio "+ precio + "</li>"+
					"</ul>" + "<img src='img/home.jpg'>" +
					"</div>";
				$(".colContenido").append(resTipo);
			}
		  
        });
    });
 


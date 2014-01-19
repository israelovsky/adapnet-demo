var contenedor=$('#page');
var rootURL = "../server/api/orders";

function formToJSONOrder(name, email, observations,id_article, id_user) {
	return JSON.stringify({
		"name": name, 
		"email": email, 
		"observations": observations,
		"id_article": id_article,
		"id_user": id_user
		});
}

function agregarSubProyecto(name, email, observations,id_article, id_user) {
	console.log(formToJSONOrder(name, email, observations,id_article, id_user));
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL,
		dataType: "json",
		data: formToJSONOrder(name, email, observations,id_article, id_user),
		success: function(data, textStatus, jqXHR){
			console.log(data);
			$('#alerta').show('fast');
			$('#txtNombre').val('');
			$('#txtEmail').val('');
			$('#txtArticulo').val('');
			$('#txtObservations').val('');
			$('#txtNombre').focus();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('agregarSubProyecto error: ' + textStatus);
		}
	});
}


var template='<div class="row"> \
	<div class="col-md-2"></div> \
	<div class="col-md-8"> \
		<div id="alerta" class="alert alert-info"> \
            Se ha creado nueva órden de trabajo exitosamente. \
        </div> \
		<div class="panel panel-default"> \
  			<div class="panel-heading">\
    			<h3 class="panel-title"><b>Nueva Orden</b></h3>\
			</div>\
		  	<div class="panel-body">\
		    	<form role="form">\
				  <div class="form-group">\
				   <label for="txtNombre">Cliente:</label> \
				    <input type="email" class="form-control" id="txtNombre" placeholder="Ingresa tu nombre completo"> \
				  </div> \
				  <div class="form-group"> \
				    <label for="txtEmail">Correo electrónico:</label> \
				    <input type="email" class="form-control" id="txtEmail" placeholder="ejemplo@adapnet.com"> \
				  </div> \
				  <div class="form-group"> \
				    <label for="txtArticulo">Artículo:</label> \
				       	<select id="txtArticulo" class="form-control"> \
						  <option value="1">Pantalla LCD</option> \
						  <option value="2">Telefonía Móvil</option> \
						  <option value="3">Tablets</option> \
						</select> \
				  </div> \
				  <div class="form-group"> \
				    <label for="txtObservations">Observaciones:</label> \
				    <textarea class="form-control" id="txtObservations" rows="4"></textarea> \
				  </div> \
				  	<!--<button type="submit" value="Enviar" class="btn btn-default">Enviar</button>--> \
				  <div class="text-right"> \
						<br> \
						<button type="button" id="btnSendOrder" class="btn btn-primary btn-sm">Enviar</button>  \
						<button type="button" class="btn btn-danger btn-sm">Cancelar</button> \
				  </div> \
				</form> \
		  	</div> \
		</div> \
	</div> \
	<div class="col-md-2"></div> \
</div>';
$(document).ready(function() {
	$('#aOrder').click(function(event) {
		event.preventDefault();
		contenedor.html(template);
		$('#alerta').hide();
		$('#txtNombre').focus();
	});

	contenedor.on('click', '#btnSendOrder', function(event) {
		event.preventDefault();
		var name=$('#txtNombre').val();
		var email=$('#txtEmail').val();
		var idArticle=$('#txtArticulo').val();
		alert(idArticle);
		var observations=$('#txtObservations').val();
		var idUser= 1;
		if (name.length>1) {
			agregarSubProyecto(name,email,observations,idArticle,idUser);

			//DEMO - Notificación de nueva orden de trabajo
	      	numPendientes = numPendientes + 1;
	      	$("#numPendientes").text(numPendientes);

		}
		else{
			$('#txtNombre').focus();
		}

	});
});

var contenedor=$('#page');


var templateReq='<div class="row"> \
	<div class="col-md-2"></div> \
	<div class="col-md-8"> \
		<div id="alerta" class="alert alert-info"> \
            Se ha enviado solicitud de requisición exitosamente. \
        </div> \
		<div class="panel panel-default"> \
  			<div class="panel-heading">\
    			<h3 class="panel-title"><b>Solicitud de Requisición</b></h3>\
			</div>\
		  	<div class="panel-body">\
		    	<form role="form">\
		    	<div class="form-group"> \
				    <label for="txtArticulo">Artículo:</label> \
				       	<select id="txtArticulo" class="form-control"> \
						  <option value="1">Pantalla LCD</option> \
						  <option value="2">Telefonia Movil</option> \
						  <option value="3">Tablets</option> \
						</select> \
				  </div> \
				  <div class="form-group">\
				   <label for="txtParte">Núm. Parte:</label> \
				    <input type="text" class="form-control" id="txtParte" placeholder=""> \
				  </div> \
				  <div class="form-group">\
				   <label for="txtNum">Cantidad:</label> \
				    <input type="text" class="form-control" id="txtNum" placeholder=""> \
				  </div> \
				  <div class="form-group"> \
				    <label for="txtProveedor">Proveedor:</label> \
				       	<select id="txtProveedor" class="form-control"> \
						  <option value="1">Samsung</option> \
						  <option value="2">Sony</option> \
						  <option value="3">Toshiba</option> \
						</select> \
				  </div> \
				  <div class="text-right"> \
						<br> \
						<button type="button" id="btnEnviar" class="btn btn-primary btn-sm">Enviar</button>  \
						<button type="button" id="btnCancelar" class="btn btn-danger btn-sm">Cancelar</button> \
				  </div> \
				</form> \
		  	</div> \
		</div> \
	</div> \
	<div class="col-md-2"></div> \
</div>';

$(document).ready(function() {
	$('#aRequisicion').click(function(event) {
		event.preventDefault();
		contenedor.html(templateReq);
		$('#alerta').hide();
		$('#txtArticulo').focus();
	});

	contenedor.on('click', '#btnEnviar', function(event) {
		event.preventDefault();
		var articulo=$('#txtArticulo').val();
		var numparte=$('#txtParte').val();
		var cantidad=$('#txtNum').val();
		var proveedor=$('#txtProveedor').val();
		
		solicitarRequisicion(articulo,numparte,cantidad, proveedor);
			
	});
});

function solicitarRequisicion(articulo,numparte,cantidad, proveedor){

	//DEMO - Notificación de nueva orden de trabajo
	numRequisicion = numRequisicion + 1;
	$("#numRequisicion").text(numRequisicion);

	$('#txtArticulo').val('');
	$('#txtParte').val('');
	$('#txtNum').val('');
	$('#txtProveedor').val('');
	$('#alerta').show('fast');
}
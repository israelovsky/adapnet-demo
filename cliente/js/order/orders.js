var contenedor=$('#page');
var contPaqueteria=0;
var rowActual=0;

function findAllOrders() {
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		beforeSend: function(){
			$('#bodyOrders').html('<div class="col-md-12 text-center"><div class="spinner"><div class="dot1"></div><div class="dot2"></div></div></div>');
		},
		success: renderTable
	});
}

function renderTable(data){
	var orders = data == null ? [] : (data.order instanceof Array ? data.order : [data.order]);
	$('#bodyOrders').html("");
	$("#numPendientes").html(orders.length);
	$.each(orders, function(index, order) {
		$('#bodyOrders').append('<tr id="row-'+order.id_order+'"><td>'+order.id_order+'</td><td>'+order.name+'</td><td>'+order.email+'</td><td>'+order.observations+'</td><td>'+order.description+'</td><td>'+order.datetime+'</td><td><button type="button" data-id="'+order.id_order+'" class="btn btn-success btn-xs asignar"><span class="glyphicon glyphicon-check"></span>Asignar</button></td></tr>');

		
	});
}
var templateTable='<!-- Modal --> \
			<div class="modal fade" id="modalRevision" tabindex="-1" role="dialog" aria-labelledby="modalRevisionLabel" aria-hidden="true"> \
			  <div class="modal-dialog"> \
			    <div class="modal-content"> \
			      <div class="modal-header"> \
			        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
			        <h4 class="modal-title" id="modalRevisionLabel">Asignación de la orden</h4> \
			      </div> \
			      <div id="modalRevisionBody" class="modal-body"> \
				      	<div id="prevForm"> \
					        <div class="form-inline" role="form"> \
							  <div class="form-group"> \
							    <label><b>Centro de servicio</b></label> \
							    <select id="selectorCentro" class="form-control"> \
							      <option val="Regional">Regional</option> \
							      <option val="Local">Local</option> \
							    </select> \
							  </div> \
							</div> \
							<div id="PanelPaqueteria" class="panel panel-default"> \
								<div> \
									<span id="alertaAsignacion"></span> \
								</div> \
							  	<div class="panel-body"> \
							    	<b>Paquetería</b> \
							   		<label class="checkbox"> \
							      		<input type="checkbox" id="chkNoPaqueteria" value="option1"> No requiere paquetería \
							    	</label> \
								    <label class="checkbox"> \
								      	<input type="checkbox" id="inlineCheckbox2" value="option1"> Solicitar Num. de Guía DHL \
								    </label> \
								    <label class="checkbox">  \
								      	<input type="checkbox" id="inlineCheckbox3" value="option1"> Solicitar Num. de Guía FEDEX \
								    </label> \
							  </div> \
							</div> \
						</div>\
						<div id="nextForm"> \
							<div id="PanelAsignacion" class="panel panel-default"> \
								<div class="panel-body text-center"> \
									Asignación: <b><span id="selAsignacion">Regional</span></b>  <br>\
									Número de guía: <b><span id="numGuia">1231</span></b> \
								</div> \
							</div> \
						</div> \
			      </div> \
			      <div class="modal-footer"> \
			      	<button type="button" id="btnAsignar" class="btn btn-primary">Asignar</button> \
			        <button type="button" id="btnCancelar" class="btn btn-danger" data-dismiss="modal">Cancelar</button> \
			      </div> \
			    </div><!-- /.modal-content --> \
			  </div><!-- /.modal-dialog --> \
			</div><!-- /.modal --> \
			<!-- separador --> \
			<div class="table-responsive"> \
				<table class="table table-condensed">\
		        	<thead>\
			          	<tr>\
			            	<th>Id</th>\
			            	<th>Nombre</th>\
			            	<th>Correo Electrónico</th>\
			            	<th>Observaciones</th>\
			            	<th>Artículo</th>\
			            	<th>Fecha</th>\
			            	<th></th>\
			          	</tr>\
		        	</thead>\
			        <tbody id="bodyOrders">\
			        </tbody>\
		      	</table>\
			</div>';
$(document).ready(function() {
	$('#aOrders').click(function(event) {
		event.preventDefault();
		contenedor.html(templateTable);
		findAllOrders();

	});
	contenedor.on('click', '.asignar', function(event) {
		event.preventDefault();
		/* Act on the event */
		$('#nextForm').hide();
		$('#modalRevision').modal('show');
		$('#btnAsignar').show();
		$('#btnCancelar').html("Cancelar");
		$('#prevForm').show();
		$('#nextForm').hide();
		rowActual=$(this).attr('data-id');
	});
	contenedor.on('click', '#btnAsignar', function(event) {
		if (contPaqueteria===0) {
			$('#alertaAsignacion').html("<i>*Seleccione una opción</i>");
		}
		else{
			if ($('#chkNoPaqueteria').is(':checked')) {
				//alert("");
				$('#numGuia').html("Sin paquetería");
			}
			else{
				var numGuia=Math.floor((Math.random()*10000)+1);
				$('#numGuia').html(numGuia);
			}
			$('#prevForm').hide('fast');
			$('#nextForm').show('fast');
			$('#selAsignacion').html($('#selectorCentro').val());
			
			$('#btnAsignar').hide();
			var pendientesActuales=$("#numPendientes").html();
			pendientesActuales--;
			var asignacionActuales=$("#numAsignacion").html();
			asignacionActuales++;
			$("#numPendientes").text(pendientesActuales);
			$("#numAsignacion").text(asignacionActuales);
			$('#btnCancelar').html("Cerrar");
		}
		
	});
	contenedor.on('click', '#btnCancelar', function(event) {
		$("#row-"+rowActual+"").hide('slow');
	});
	
	contenedor.on('click', 'input[type=checkbox]', function(event) {
		if( $(this).is(':checked') ){
			contPaqueteria++;
			$('#alertaAsignacion').html(" ");
		}
		else{
			contPaqueteria--;
		} 
		
	});
	
});

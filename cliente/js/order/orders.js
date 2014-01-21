var contenedor=$('#page');


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
	$.each(orders, function(index, order) {
		//$('#bodyOrders').append('<tr><td>'+order.id_order+'</td><td>'+order.name+'</td><td>'+order.email+'</td><td>'+order.observations+'</td><td>'+order.description+'</td><td>'+order.datetime+'</td><td><a class="btn btn-default"><span class="glyphicon glyphicon-check"></span></a></td></tr>');
		$('#bodyOrders').append('<tr><td>'+order.id_order+'</td><td>'+order.name+'</td><td>'+order.email+'</td><td>'+order.observations+'</td><td>'+order.description+'</td><td>'+order.datetime+'</td><td><button type="button" class="btn btn-success btn-xs asignar"><span class="glyphicon glyphicon-check"></span>Asignar</button></td></tr>');

		
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
			        <div class="form-inline" role="form"> \
					  <div class="form-group"> \
					    <label><b>Centro de servicio</b></label> \
					    <select class="form-control"> \
					      <option>Regional</option> \
					      <option>Local</option> \
					    </select> \
					  </div> \
					</div> \
					<div id="PanelPaqueteria" class="panel panel-default"> \
					  <div class="panel-body"> \
					    <b>Paquetería</b> \
					    <label class="checkbox"> \
					      <input type="checkbox" id="inlineCheckbox1" value="option1"> No requiere paquetería \
					    </label> \
					    <label class="checkbox"> \
					      <input type="checkbox" id="inlineCheckbox2" value="option1"> Solicitar Num. de Guía DHL \
					    </label> \
					    <label class="checkbox">  \
					      <input type="checkbox" id="inlineCheckbox3" value="option1"> Solicitar Num. de Guía FEDEX \
					    </label> \
					  </div> \
					</div> \
			      </div> \
			      <div class="modal-footer"> \
			      	<button type="button" class="btn btn-primary">Asignar</button> \
			        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancelar</button> \
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
		$('#modalRevision').modal('show');
	});
});

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
		$('#bodyOrders').append('<tr><td>'+order.id_order+'</td><td>'+order.name+'</td><td>'+order.email+'</td><td>'+order.observations+'</td><td>'+order.description+'</td><td>'+order.datetime+'</td><td><button type="button" class="btn btn-success btn-xs"><span class="glyphicon glyphicon-check"></span>Asignar</button></td></tr>');

		
	});
}
var templateTable='<div class="table-responsive"> \
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
});

window.numPendientes = 0;
window.numAsignacion = 0;
window.numRequisicion= 0;
window.numDocumentos = 0;

$("#numPendientes").text(window.numPendientes);
$("#numAsignacion").text(window.numPendientes);
$("#numRequisicion").text(window.numPendientes);
$("#numDocumentos").text(window.numPendientes);

$(document).ready(function() {
	countOrders();
	function countOrders() {
		$.ajax({
			type: 'GET',
			url: rootURL,
			dataType: "json", // data type of response
			success: renderPendientes
		});
	}

	function renderPendientes(data){
		var orders = data == null ? [] : (data.order instanceof Array ? data.order : [data.order]);
		$("#numPendientes").html(orders.length);
	}
});

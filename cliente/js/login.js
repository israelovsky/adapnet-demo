window.userName = '';


$( document ).ready(function() {
	$('#btnLogin').click(function(event) {
		userName = $('#txtUsername').val();
		//$("#userName").text(window.numPendientes);
	});
   
});

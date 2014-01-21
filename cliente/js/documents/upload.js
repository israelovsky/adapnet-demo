var user ="Israel"
var socket=null; 
var filename=null;


var contenedor=$('#page');
var templateUpload='<h3><b>Intercambio de Documentos</b><small> Seleccione el documento que desea enviar.</small></h3> \
<div class="row"> \
	<div class="col-md-12"> \
		<hr> \
	</div> \
</div> \
<div class="row"> \
	<div class="col-md-1"> \
	</div> \
	<div class="col-md-10"> \
			<div id="alertaUpload" class="alert alert-info"> \
	            Archivo enviado correctamente. \
	        </div> \
		<form role="form"> \
		  <div class="form-group"> \
		    <label for="exampleInputEmail1">Archivo</label> \
		   	<div class="input-group"> \
				<span class="input-group-btn"> \
					<span class="btn btn-primary btn-file"> \
						Abrir<input class="file" type="file" multiple=""> \
					</span> \
				</span> \
				<input type="text" id="txtArchivo" class="form-control" readonly=""> \
			</div> \
		  </div> \
		  <div class="form-group"> \
		    <label for="txtObservaciones">Observaciones</label> \
		    <textarea id="txtObservaciones" class="form-control" rows="3"></textarea> \
		  </div> \
		  <div class="panel panel-default"> \
			<div class="panel-body panel-buttons text-center"> \
			<button type="button" class="btn btn-primary btn-sm" id="enviar" type="submit">Enviar</button> \
			<button type="button" class="btn btn-danger btn-sm" id="cancelar">Cancelar</button> \
		</div>\
	</div> \
		</form>  \
	</div> \
	<div class="col-md-1">	 \
	</div> \
</div> \
';




$(document).ready(function() {
	 try{

	 	//socket = io.connect('http://adapnettest.cloudapp.net:8080');   
        //socket.emit('storeClientInfo', { username: user});        
        
        //Cuando el usuario se desconecta
      socket.on('disconnect', function () {
      alert('Estatus: Cliente desconectado.');
      });        
    }
    catch(e){
      console.log(e);
    }

	$('#aUpload').click(function(event) {
		event.preventDefault();
		contenedor.html(templateUpload);
		$('#alertaUpload').hide();
		socket = io.connect('http://localhost:8080');
	});
	$(document).on('change', '.btn-file :file', function() {
	        var input = $(this),
	            numFiles = input.get(0).files ? input.get(0).files.length : 1,
	            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
	        input.trigger('fileselect', [numFiles, label]);
	        $('#txtArchivo').val(label);
	        filename=label;
	        $('#txtObservaciones').focus();
	});

	contenedor.on('click', '#cancelar', function(event) {
		 $('#txtArchivo').val('');
		 $('#txtArchivo').focus();
	      $('#txtObservaciones').val('');
	});

	contenedor.on('click', '#enviar', function(event) {
	   try 
	   {   
	      var notificacion = {
	      //From: $('#usuario').val(),
	      From: user,
	      File: 'Usted ha recibido el archivo: '+filename
	      };
	      //Envio de notificación al servidor
	      socket.emit('setNotification', notificacion);

	      //DEMO - Notificación de archivo enviados
	      numDocumentos = numDocumentos + 1;
	      $("#numDocumentos").text(numDocumentos);
	      
	      $('#alertaUpload').show('fast');    
	      $('#txtArchivo').val('');
	      $('#txtObservaciones').val('');

	    }  
	    catch(e) 
	    {
	    	console.log(e);
	    	$('#alertaUpload').show('fast');
	    	$('#alertaUpload').html("Ha ocurrido un inconveniente, Intente de nuevo por favor.");
	    }
	  });     



});

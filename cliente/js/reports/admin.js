var contenedor=$('#page');
var templateAdmin='<h3>Dashboard <small>Estadística y monitoreo</small></h3> \
<div class="row"> \
	<div class="col-md-4"> \
		<div class="panel panel-info"> \
			<div class="panel-heading"> \
				<div class="row"> \
					<div class="col-xs-6"> \
						<i class="fa fa-users fa-5x"></i> \
					</div> \
					<div class="col-xs-6 text-right"> \
						<p class="announcement-heading"><span id="contador"></span></p> \
						<p class="announcement-text">Usuarios conectados</p> \
					</div> \
				</div> \
			</div> \
		</div> \
	</div> \
	<div class="col-md-4"> \
		<div class="panel panel-success"> \
			<div class="panel-heading"> \
				<div class="row"> \
					<div class="col-xs-6"> \
                    	<i class="fa fa-comments fa-5x"></i> \
                  	</div> \
                 	<div class="col-xs-6 text-right"> \
                    	<p class="announcement-heading"></p> \
                    	<p class="announcement-text">órdenes recibidas</p> \
                  	</div> \
                </div> \
           	</div> \
		</div> \
	</div> \
	<div class="col-md-4"> \
		<div class="panel panel-warning"> \
			<div class="panel-heading"> \
				<div class="row"> \
					<div class="col-xs-6"> \
                    	<i class="fa fa-tasks fa-5x"></i> \
                  	</div> \
                 	<div class="col-xs-6 text-right"> \
                    	<p class="announcement-heading"></p> \
                    	<p class="announcement-text">Alertas</p> \
                  	</div> \
                </div> \
           	</div> \
		</div> \
	</div> \
</div> \
<div class="row"> \
	<div class="col-md-4"> \
		<div class="panel panel-primary"> \
            <div class="panel-heading"> \
				<h3 class="panel-title"><i class="fa fa-bar-chart-o"></i> Ordenes: 1 Octubre - 31 Octubre, 2013</h3> \
            </div> \
            <div class="panel-body"> \
            	<div id="morris-chart-area"></div> \
            </div> \
       	</div> \
	</div> \
	<div class="col-md-4"> \
		<div class="panel panel-primary"> \
            <div class="panel-heading"> \
				<h3 class="panel-title"><i class="fa fa-bar-chart-o"></i> Visitas mensuales</h3> \
            </div> \
            <div class="panel-body"> \
            	<div id="morris-chart-line"></div> \
            </div> \
       	</div> \
	</div> \
	<div class="col-md-4"> \
		<div class="panel panel-primary"> \
            <div class="panel-heading"> \
				<h3 class="panel-title"><i class="fa fa-bar-chart-o"></i> Documentos por Usuario</h3> \
            </div> \
            <div class="panel-body"> \
            	<div id="morris-chart-bar"></div> \
            </div> \
       	</div> \
	</div> \
</div>';


$(document).ready(function() {
	var socket = io.connect('http://adapnettest.cloudapp.net:4000');
	$('#aAdmin').click(function(event) {
		event.preventDefault();
		contenedor.html(templateAdmin);

		Morris.Donut({
			element: 'morris-chart-area',
		  	data: [
		    	{label: "Liberadas", value: 30},
		    	{label: "Pendientes", value: 40},
		    	{label: "Activas", value: 20}
		  	]
		});

		Morris.Line({
		  // ID of the element in which to draw the chart.
		  element: 'morris-chart-line',
		  // Chart data records -- each entry in this array corresponds to a point on
		  // the chart.
		  data: [
			{ d: '2012-10-01', visits: 802 },
			{ d: '2012-10-02', visits: 783 },
			{ d: '2012-10-03', visits:  820 },
			{ d: '2012-10-04', visits: 839 },
			{ d: '2012-10-05', visits: 792 },
			{ d: '2012-10-06', visits: 859 },
			{ d: '2012-10-07', visits: 790 },
			{ d: '2012-10-08', visits: 1680 },
			{ d: '2012-10-09', visits: 1592 },
			{ d: '2012-10-10', visits: 1420 },
			{ d: '2012-10-11', visits: 882 },
			{ d: '2012-10-12', visits: 889 },
			{ d: '2012-10-13', visits: 819 },
			{ d: '2012-10-14', visits: 849 },
			{ d: '2012-10-15', visits: 870 },
			{ d: '2012-10-16', visits: 1063 },
			{ d: '2012-10-17', visits: 1192 },
			{ d: '2012-10-18', visits: 1224 },
			{ d: '2012-10-19', visits: 1329 },
			{ d: '2012-10-20', visits: 1329 },
			{ d: '2012-10-21', visits: 1239 },
			{ d: '2012-10-22', visits: 1190 },
			{ d: '2012-10-23', visits: 1312 },
			{ d: '2012-10-24', visits: 1293 },
			{ d: '2012-10-25', visits: 1283 },
			{ d: '2012-10-26', visits: 1248 },
			{ d: '2012-10-27', visits: 1323 },
			{ d: '2012-10-28', visits: 1390 },
			{ d: '2012-10-29', visits: 1420 },
			{ d: '2012-10-30', visits: 1529 },
			{ d: '2012-10-31', visits: 1892 },
		  ],
		  // The name of the data record attribute that contains x-visitss.
		  xkey: 'd',
		  // A list of names of data record attributes that contain y-visitss.
		  ykeys: ['visits'],
		  // Labels for the ykeys -- will be displayed when you hover over the
		  // chart.
		  labels: ['Visitas'],
		  // Disables line smoothing
		  smooth: false,
		});

		Morris.Bar ({
		  element: 'morris-chart-bar',
		  data: [
			{device: 'Administrador', geekbench: 136},
			{device: 'Miguel Díaz', geekbench: 137},
			{device: 'Ricardo Perez', geekbench: 275},
			{device: 'Israel Ramirez', geekbench: 380}
		  ],
		  xkey: 'device',
		  ykeys: ['geekbench'],
		  labels: ['Archivos'],
		  barRatio: 0.4,
		  xLabelAngle: 35,
		  hideHover: 'auto'
		});
		
        socket.on('message', function(msg){
        	mensajeRecibido(msg);
        });
	});





});

function mensajeRecibido(msg){
	console.log(msg);
        $("#contador").html(msg.clientes);
}
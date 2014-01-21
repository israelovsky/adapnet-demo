var app = require('http').createServer(handler).listen(8080);
var io = require('socket.io').listen(app);

var connectedClients = []; //Información total del cliente conectado
var clientInfo=null; //Descripción del usuario y socket del cliente conectado
var connectedUsers=[]; //Lista de usuarios y socket de clientes conectados

function handler(req,res){
   console.log(req.url);
   res.writeHead(200, {'Content-Type':'text/plain'});
   res.end('Hello Node\n You are really really awesome!');
}


//Cliente se conectó al servidor
io.sockets.on('connection',function(socket){

    //connectedClients[socket.id] = {};
    //connectedClients[socket.id].socket = socket; //Almacena la información del cliente que se conectó  
    
    console.log('Cliente: CONECTADO'); //Solo para prueba
        
	
	//Recepción de notificacion
	socket.on('setNotification', function(notificacion) {
		var notificationInfo = new Object();
            //notificationInfo.clientId = socket.id;
            notificationInfo.From = notificacion.From;
            notificationInfo.Comment = notificacion.File;
           
             //Solo para prueba
            //console.log('ID(Emisor): ' + notificationInfo.clientId);
            console.log('DE: ' + notificationInfo.From);
            console.log('NOOMBRE DE ARCHIVO: ' + notificationInfo.Comment); 

    socket.broadcast.emit('sendNotification', notificationInfo);    //Funcionando  
    })
     
    //Desconexión de cliente
    socket.on('disconnect',function (data){
                console.log('Cliente: DESCONECTADO ' + socket.id);       
    }) 

    //Elimina clientes de la lista
    socket.on('deleteClientInfo', function(data) {
                console.log('Usuario a ELEMINAR: '+data.userName);
                //if(connectedClients.hasOwnProperty(socket.id)) {
                //Eliminia usuarios
                //delete connectedClients[socket.id];  
                //}   
    })
});


//Muestra los usuarios conectados con su respectivo socket
function showConnectedUsers(){
   for (i=0;i<connectedUsers.length;i++) {
        console.log(connectedUsers[i]);
    }
}
var express = require("express");
var app = express();
var socket = require('socket.io');
var server = app.listen(4000);
var io = socket.listen(server);
 
app.get('/', function(request, response){
  response.sendfile(__dirname + "/main.html");
});
 
var clientesActivos = 0;
 
io.sockets.on('connection', function(socket){
    conectarCliente(socket);
});
 
function conectarCliente(socket){
    clientesActivos +=1;
    io.sockets.emit('message', { clientes:clientesActivos });
    socket.on('disconnect', function(){
        desconectarCliente();
    });
}
 
function desconectarCliente(){
  clientesActivos -=1;
  io.sockets.emit('message', { clientes:clientesActivos });
}
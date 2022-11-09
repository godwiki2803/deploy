const express = require('express');
const { Server } = require("socket.io");
const app = express();
const http = require('https');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: ["https://beta.jobbi.mx/*", "https://beta.jobbi.mx:*", "*.beta.jobbi.mx:*", "https://beta.jobbi.mx", "https://beta.jobbi.mx/inicio.php"],
        //origin: ["http://localhost", "http://localhost:8080", "http://127.0.0.1", "http://127.0.0.1:8080"],
      credentials: true,
    }
});
var server_port = 443;

io.on('connection', (socket) => { 
  console.log("Un usuario a ingresado a la plataforma.");
  
  socket.on("notifications" , (value) => {
    console.log("Notificacion recibida: " + value);
    io.emit("notifications", value);
  });

  socket.on('new offer' , (offer_signal) => {
    console.log("Nueva oferta para: "+ offer_signal);
    io.emit('new offer' , offer_signal);
  });
  socket.on('new service' , (offer_for) =>{
    console.log("Nuevo servicio requerido para el area de: " + offer_for );
    io.emit('new service' , offer_for);
  });

  socket.on('app_msg', (msg) => {
     console.log("----------- MENSAJE -----------");
     console.log(msg.ns);
     console.log(msg.user);
     console.log(msg.content);
     console.log(msg.file);
     console.log("-------------------------------");
    io.emit('app_msg', msg);
  });
});

server.listen(server_port, () => {
  console.log('Servicor escuchando en el puerto: ' + server_port);
});

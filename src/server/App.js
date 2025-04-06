// WebSocket server express.js con funcionalidad de suscripcion a eventos, publicar y mostrar lista de eventos
// El servidor escucha en el puerto 3050 y permite la conexion de clientes a traves de WebSocket
// Los eventos son almacenados en una lista y se pueden publicar a los clientes conectados
// El servidor guarda los eventos en memoria y lo limpia cada 24 horas
// Es un WebSocket server que permite la comunicacion en tiempo real entre el servidor y los clientes
// El servidor utiliza express.js para crear un servidor HTTP y WebSocket
// El servidor utiliza la libreria ws para crear el servidor WebSocket
// El servidor utiliza la libreria moment para manejar fechas y horas
// El servidor es para mensajeria en tiempo real y notificaciones


import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

// Lista para almacenar los mensajes
const messages = [];

// Configuración del WebSocket
wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado' + ws._socket.remoteAddress);


    // Enviar la lista de mensajes al cliente recién conectado
    ws.send(JSON.stringify({ type: 'history', data: messages }));

    // Manejar mensajes recibidos del cliente
    ws.on('message', (message) => {
        console.log('Mensaje recibido:', message);

        // Guardar el mensaje en la lista
        const newMessage = { id: Date.now(), text: message.toString() };
        messages.push(newMessage);

        // Enviar el mensaje a todos los clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'message', data: newMessage }));
            }
        });
    });

    // Manejar la desconexión del cliente
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Limpiar los mensajes cada 24 horas
setInterval(() => {
    messages.length = 0;
    console.log('Mensajes limpiados');
}, 24 * 60 * 60 * 1000);

// Iniciar el servidor
const PORT = 3050;
server.listen(PORT, () => {
    console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
});




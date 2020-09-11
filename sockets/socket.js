const { io } = require('../index.js');

// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!', payload);
        io.emit('mensaje', { admin: "Se conectó un nuevo usuario" });
        client.emit('mensaje', { admin: "Bienvenido" });
    });

    client.on('emitir-mensaje', (payload) => {
        //io.emit('nuevo-mensaje', payload)
        client.broadcast.emit('nuevo-mensaje', payload);
        console.log('mensaje ', payload);
    });
});
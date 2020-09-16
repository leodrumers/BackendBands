const { io } = require('../index.js');
const Bands = require('../models/bands.js');
const Band = require('../models/band.js');

const bands = new Bands();
bands.addBand(new Band('Switchfoot'));
bands.addBand(new Band('Skillet'));
bands.addBand(new Band('Israel Houghton'));
bands.addBand(new Band('Hillsong'));
bands.addBand(new Band('Marco Barrientos'));

// Mensajes de sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

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

    client.on('vote-band', (payload) => {
        console.log(payload)
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        console.log(payload)
        bands.addBand(newBand)
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        console.log('deleting', payload)
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
});
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.json({
        msg: `Server Socket run in ${port}`
    });
});

server.listen(port, () => {
    console.log(`Server run in port: ${port}`);
});

io.on('connection', (socket) => {
    console.log(`New nodo IP ${socket.handshake.address}`);

    //Description: Escuchamos newLocation y emitimos por showLocation
    socket.on('newLocation', (data) => {
        console.log(`llego ${JSON.stringify(data)}`);
        socket.broadcast.emit('showLocation', data);
    });
    
    socket.on('disconnect', () => {
        console.log(`Disconnect node IP ${socket.handshake.address}`);
    });

});
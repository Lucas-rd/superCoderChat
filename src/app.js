import express from 'express';
import {Server} from 'socket.io';
import __dirname from './utils.js';

const app = express();

//ESto lo hacemos asi porque process.env.algo estamos hablando de una variable de entorno. Cuando hagamos el "Deploy" necesitamos tener en cuenta que escuche a traves del puerto de la nuebe donde subamos el codigo. Entonces le digo que el puerto lo decida una variable de entorno de puerto y en caso que no exista dicha variable tomo el 8080 y cuando lo trabajo en local entonces uso el 8080.
const PORT = process.env.PORT||8080;
app.use(express.static(__dirname+'/public'));
const server = app.listen(PORT, ()=>{
    console.log(`Listening on PORT ${PORT}`)
});

//Este es el servidor de io que levanto dentro del servidor de express. Este servidor de io es el que escucha con el protocolo TCP.
const io = new Server(server);

const log =[];

//Aca creo un io.on que es un "listener". Le digo que escuche el evento "connection" y al socket que se conecte haga lo siguiente al escuchar.
io.on('connection', socket=>{

    socket.on('message', data=>{
        log.push(data);
        //Aca lo devolvemos con io para que sea global a todos, no solo al mismo socket que lo envio.
        io.emit('log', log)
    })
})
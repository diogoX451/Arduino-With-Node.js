'use strict'
// Chama as declarações 
const {SerialPort, DelimiterParser} = require('serialport');
var {ReadlineParser}  = require('@serialport/parser-readline');
const express = require('express');
const http = require('http');
const fs = require('fs');
var index = fs.readFileSync( './src/index.html');
const path = require('path'); 
const cors = require('cors');
const app = express();
const ejs = require('ejs');

// Cria as rotas
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

//Arduino
var port = "COM4" //Coloca nome da sua porta USB do Arduino
const serial = SerialPort.serialPort;
const com = new SerialPort({ 
    path: port,
    baudRate: 9600
    
});
var toArduino
var toApp
com.on("open",open)
function open(){
  console.log("Porta conectada com a Porta COM4");

}
// Novo tipo de declaração... Antigos metodos dava erro no Readline
var parser = com.pipe(new ReadlineParser({DelimiterParser: '\n'}));
parser.on("data",getData)

function getData(data){
    io.emit("data",  data.toString('utf8'));
    console.log(data) //=> Onde recebe os dados Seriais
}

// Subir o servidor
var server = http.createServer(app).listen(app.get('port'), function () {
    console.log("Rodando na porta " + app.get('port'));
});

app.get('/', (req, res, next) => {
    //res.send('ads')
    res.sendFile(__dirname + '/index.html');
});


//* Conectar com io
var io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log('Node is listening to port');
});

com.on('data', function(data){
    // console.log('Received data from port: ' + data);
    io.emit('data', data);
});






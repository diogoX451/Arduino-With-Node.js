const io = require('socket.io');
const router = require('express').Router();

var port = "COM4" //Coloca nome da sua porta USB do Arduino
const serial = SerialPort.serialPort;
const com = new SerialPort({ 
    path: port,
    baudRate: 9600
    
});
var toArduino
var toApp
com.on("open",open);

function open(){
  console.log("Porta conectada com a Porta COM4");

}
// Novo tipo de declaração... Antigos metodos dava erro no Readline
var parser = com.pipe(new ReadlineParser({DelimiterParser: '\n'}));
parser.on("data",getData)

function getData(data){
//   console.log(data) => Onde recebe os dados Seriais
}

o.on('connection', function(socket) {
    console.log('Node is listening to port');
});

parser.on('data', function(data){
    // console.log('Received data from port: ' + data);
    io.emit('data', data);
});

router.get('/', (req, res, next) => {
    //res.send('ads')
    res.render('index.html');
});

module.exports = router;
'use strict'

const express = require('express');
var {ReadlineParser}  = require('@serialport/parser-readline');
const {SerialPort, DelimiterParser} = require('serialport');
const router = express.Router();
const controller = require('../controllers/temperatura-controlers');

//definir rotas

let value = "";

router.get('/getTemperature', controller.getLastTemperature);;
router.post('/insertTemperature', controller.post);

// Variavel do Arduino

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
//   console.log(data) => Onde recebe os dados Seriais

    console.log(data.toString('utf8'));
    value = data.toString('utf8');
    controller.insertTemp(value);
}

module.exports = router
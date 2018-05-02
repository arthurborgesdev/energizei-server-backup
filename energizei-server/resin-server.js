const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const assert = require('assert');
//const connection = require('./mongo_connection');
//const DBconnection = require('./mongo_connection').connection;
const bodyParser = require('body-parser');
const app = express();

var db;
var dbURL = 'mongodb://localhost:27017/ResinAC';

MongoClient.connect(dbURL, function(err, database) {
  assert.equal(null, err);
  db = database;
  console.log("Connected correctly to database");
});

// Parse body of Resin command first
app.use(bodyParser.urlencoded({ extended: true }));

// receive parsed body from Resin device
app.post('/weather', function(req, res) {
  var deviceData = db.collection('deviceData');
  var sensorWeather = req.body;
  deviceData.insertOne(sensorWeather);
  res.end("Servidor recebeu o pedido e gravou Weather");
})

// Fazer verificação, se o IR veio por pessoa-> ar, pessoa->device ou device->ar;
app.post('/IRReceive', function(req, res) {
  var deviceData = db.collection('deviceData');
  var sensorIRReceived = req.body;
  deviceData.insertOne(sensorIRReceived);
  res.end("Servidor recebeu o pedido e gravou IR Received");
})

app.listen(3000, function (err) {
  if (err) console.log(err);
  console.log('Energizei server listening on port 3000!');
});

// tratar post usando credenciais (nome, id, etc) do device

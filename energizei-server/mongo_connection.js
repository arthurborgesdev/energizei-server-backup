const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var dbURL = 'mongodb://localhost:27017/ResinAC';
MongoClient.connect(dbURL, function(err, database) {
  assert.equal(null, err);
  db = database;
  console.log("Connected correctly to database");
}


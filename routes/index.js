var express = require('express');
var router = express.Router();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'TodoApp';

router.get('/', (req, res, next) => {
  console.log(__dirname);
  res.sendFile(path.join(
    __dirname,'..','public','views','index.html'));
});

router.get('/api/v1/todos', (req, res, next) => {

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);   
  findDocuments(db, function(docs) {
    return res.json(docs);
    client.close();
   });  
   });
});

router.post('/api/v1/todos', (req, res, next) => {
 // Grab data from http request
  const data = {text: req.body.text, complete: false};
 // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected correctly to server"); 
  const db = client.db(dbName); 
  insertDocuments(db,data, function() {
    findDocuments(db, function(docs) {
      return res.json(docs);
      client.close();
    });
  });
});  
});
router.delete('/api/v1/todos/:todo_id', (req, res, next) => {
  const results = [];
  // Grab data from the URL parameters
  const id = req.params.todo_id;
  console.log("ID......."+id);
  // Get a Postgres client from the connection pool
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");   
    const db = client.db(dbName);   
       removeDocument(db,id,function() {
        findDocuments(db, function(docs) {
          return res.json(docs);
          client.close();
        });
        });    
  });
});

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('Todos');  
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
};

const insertDocuments = function(db,data, callback) {
  // Get the documents collection
  const collection = db.collection('Todos');
  // Insert some documents
  collection.insertMany([
    {text : data.text, complete : data.complete}
  ], function(err, result) {
    assert.equal(err, null);
    console.log("Inserted new todo into the collection");
    callback(result);
  });
}
const removeDocument = function(db,data,callback) {
  // Get the documents collection
  const collection = db.collection('Todos');
  // Delete document where a is 3
  collection.deleteOne({"text" : data}, function(err, result) {
    assert.equal(err, null);
    console.log("Removed the todo item");
    callback(result);
  });    
}
module.exports = router;
// router.put('/api/v1/todos/:todo_id', (req, res, next) => {
//   const results = [];
//   // Grab data from the URL parameters
//   const id = req.params.todo_id;
//   // Grab data from http request
//   const data = {text: req.body.text, complete: req.body.complete};
//   // Get a Postgres client from the connection pool
//   pool.connect(connectionString, (err, client, done) => {
//     // Handle connection errors
//     if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({success: false, data: err});
//     }
//     // SQL Query > Update Data
//     client.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
//     [data.text, data.complete, id],(err,resp)=>{
//       if(err){
//         console.log(err);
//          }
//       else{
//           // SQL Query > Select Data
//           client.query("SELECT * FROM items ORDER BY id ASC",(err,resp)=>{
//             if(err){
//               console.log(err.stack);
//             }
//             else{
//               // Stream results back one row at a time
//               results.push(resp.row);
//             }
//             done();
//             // After all data is returned, close connection and return results
//             return res.json(results);
//           }); 
//       }
//     });
    
//   });
// });




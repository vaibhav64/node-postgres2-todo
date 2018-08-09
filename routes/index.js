var express = require('express');
var router = express.Router();
const path = require('path');
var mongoose = require('mongoose');
const assert = require('assert');
var Item   = require('../models/item'); // get our mongoose model
var config = require('../config'); // get our config file
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

mongoose.connect(config.database);

router.get('/', (req, res, next) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname,'..','public','views','index.html'));
});

router.get('/api/v1/todos', (req, res, next) => {
  Item.find({}, function(err, items) {
    console.log(items);
    return res.json(items);
  });
});
router.post('/api/v1/todos', (req, res, next) => {
 // create a sample task
 console.log(req.body);
 var nick = new Item({ 
  description: req.body.description, 
  offer: req.body.offer  
    });
nick.save(function(err) {
  if (err) throw err;
  console.log('Task saved successfully');
  Item.find({}, function(err, items) {
    console.log(items);
  return res.json(items);
  });  
}); 

});

// const removeDocument = function(db,data,callback) {
//   // Get the documents collection
//   const collection = db.collection('todoapp');
//   // Delete document where a is 3
//   collection.deleteOne({"text" : data}, function(err, result) {
//     assert.equal(err, null);
//     console.log("Removed the todo item");
//     callback(result);
//   });    
// }

// router.delete('/api/v1/todos/:todo_id', (req, res, next) => {
//   const results = [];
//   // Grab data from the URL parameters
//   const id = req.params.todo_id;
//   console.log("ID......."+id);
//   MongoClient.connect(url,{ useNewUrlParser: true },function(err, db) {
//     if (err) throw err;
//     console.log("Connected successfully to server");   
//         removeDocument(db,id,function() {
//         findDocuments(db, function(docs) {
//           return res.json(docs);
//           client.close();
//         });
//         });    
//   });
// });
module.exports = router;
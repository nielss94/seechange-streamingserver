const express = require('express');
const routes = express.Router();
const Satoshi = require('./database/db.satoshi');

// Get satoshi: 
routes.get('/satoshi/:stream_key', function(req, res) {
   res.contentType('application/json');

   Satoshi.find({'stream_key' : req.params.stream_key})
       .then((satoshi) => {
           res.status(200).json(satoshi);
       })
       .catch((error) => res.status(400).json(error));
});

// Create new satoshi:
routes.post('/satoshi', function(req, res) {
   let satoshi = new Satoshi({ 'stream_key' : req.body.stream_key, 'timestamp' : Date.now(), 'amount' : req.body.amount });

   console.log(satoshi);

   satoshi.save()
       .then((satoshi) => {
           res.status(200).json({ message: 'New satoshi created', satoshi});
       })
       .catch((error) => {
           console.log(error);
       })
});

// Update satoshi:
routes.put('/satoshi/:stream_key', function(req, res) {
   let stream_key = req.params.stream_key;
   let updatedSatoshi = req.body;
   
   Satoshi.findOneAndUpdate({stream_key : stream_key}, updatedSatoshi)
       .then((satoshi) => {
           console.log('1');
           res.status(200).json(satoshi);
       })
       .catch((error) =>  {
           res.status(400).json(error)
       });
});

module.exports = routes;
const express = require('express');
const routes = express.Router();
const Satoshi = require('./database/db.satoshi');

// Get satoshi: 
routes.get('/satoshi/:streamKey', function(req, res) {
   res.contentType('application/json');

   Satoshi.find({'streamKey' : req.params.streamKey})
       .then((satoshi) => {
           res.status(200).json(satoshi);
       })
       .catch((error) => res.status(400).json(error));
});

// Create new satoshi:
routes.post('/satoshi', function(req, res) {
   let satoshi = new Satoshi({ 'streamKey' : req.body.streamKey, 'timestamp' : Date.now(), 'amount' : req.body.amount });

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
routes.put('/satoshi/:streamKey', function(req, res) {
   let streamKey = req.params.streamKey;
   let updatedSatoshi = req.body;
   
   Satoshi.findOneAndUpdate({streamKey : streamKey}, updatedSatoshi)
       .then((satoshi) => {
           res.status(200).json(satoshi);
       })
       .catch((error) => res.status(400).json(error))
});

module.exports = routes;
const express = require('express');
const routes = express.Router();
const { getLive } = require('./database/db.meta');

// retrieve data from mongodb:
routes.get('/live', async function(req, res) {
    res.contentType('application/json');
    res.send(await getLive());
});

// get information on one specific streamer
routes.get('/getStreamer/:streamKey', function(req, res) {
    res.contentType('application/json');
    res.send(getUser(req.params.streamKey))
});

module.exports = routes;
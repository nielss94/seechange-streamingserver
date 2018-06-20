const express = require('express');
const routes = express.Router();
const { getLive, getUser } = require('./database/db.meta');

// retrieve data from mongodb:
routes.get('/live', async function(req, res) {
    res.contentType('application/json');
    res.send(await getLive());
});

// get information on one specific streamer
routes.get('/streamers/:streamKey', async function(req, res) {
    stream_key = req.params.streamKey;

    res.contentType('application/json');
    res.send(await getUser(stream_key));
});

module.exports = routes;

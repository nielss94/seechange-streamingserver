const express = require('express');
const routes = express.Router();

// Send data to firebase db:
routes.post('/metadata????????', function(req, res) {
    res.contentType('application/json');

});

module.exports = { routes };
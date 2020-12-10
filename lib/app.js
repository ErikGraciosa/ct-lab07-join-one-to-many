//This file will have the endpoints.
const express = require('express');
const Team = require('./models/Team.js');
const app = express();

app.use(express.json());

app.post('/api/v1/teams', (req, res, next) => {
    Team
        .insert(req.body)
        .then(team => res.send(team))
        .catch(next);
});

module.exports = app;
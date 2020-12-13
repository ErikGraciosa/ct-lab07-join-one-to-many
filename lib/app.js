//This file will have the endpoints.
const express = require('express');
const Team = require('./models/Team.js');
const app = express();

app.use(express.json());


//TEAMS routes 
app.post('/api/v1/teams', (req, res, next) => {
    Team
        .insert(req.body)
        .then(team => res.send(team))
        .catch(next);
});

//Get all
app.get('/api/v1/teams', (req, res, next) => {
    Team
        .getAll()
        .then(team => res.send(team))
        .catch(next);
});

//get by id

//put

//delete



//PLAYER routes

module.exports = app;
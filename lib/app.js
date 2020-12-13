//This file will have the endpoints.
const express = require('express');
const Team = require('./models/Team.js');
const Player = require('./models/Player.js');
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
app.get('/api/v1/teams/:id', (req, res, next) => {
    Team
        .getById(req.params.id)
        .then(team => res.send(team))
        .catch(next)
});

//put
app.put('/api/v1/teams/:id', (req, res, next) => {
    Team
        .update(req.body, req.params.id)
        .then(team => res.send(team))
        .catch(next)
})

//delete
app.delete('/api/v1/teams/:id', (req, res, next) => {
    Team
        .delete(req.params.id)
        .then(team => res.send(team))
        .catch(next);
});

//PLAYER routes
app.post('/api/v1/players', (req, res, next) => {
    Player
        .insert(req.body)
        .then(player => res.send(player))
        .catch(next);
});

//Player get all
app.get('/api/v1/players', (req, res, next) => {
    Player
        .getAll()
        .then(player => res.send(player))
        .catch(next);
});

//player get by id
app.get('/api/v1/players/:id', (req, res, next) => {
    Player
        .getById(req.params.id)
        .then(player => res.send(player))
        .catch(next);
});

//player put
app.put('/api/v1/players/:id', (req, res, next) => {
    Player
        .update(req.body, req.params.id)
        .then(player => res.send(player))
        .catch(next);
});

//player delete
app.delete('/api/v1/players/:id', (req, res, next) => {
    Player
        .delete(req.params.id)
        .then(player => res.send(player))
        .catch(next);
});


module.exports = app;
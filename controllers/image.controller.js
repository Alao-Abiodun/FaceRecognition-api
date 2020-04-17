const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex');
const Clarifai = require('clarifai');

const appClarifai = new Clarifai.App({
    apiKey: "0e013e987e9147569472d644a1c4dbf0",
});


const handleApiCall = (req, res) => {
    appClarifai.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to work with API'))
}


const app = express();

app.use(bodyParser.json());

const db = knex({
    client: 'pg',
    connection: {
        host: 'postgresql-shallow-27741',
        user: 'postgres',
        password: 'alao1996',
        database: 'smart_brain'
    }
});

const handleImage = (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
};

module.exports = {
    handleImage,
    handleApiCall
}
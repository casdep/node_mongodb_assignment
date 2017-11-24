//
// ./api/v1/user.routes.v1.js
//
var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Recipe = require('../model/recipe.model');


routes.get('/recipes', function(req, res) {
    res.contentType('application/json');
    Recipe.find({})
        .then((recipes) => {
            console.log(recipes.ingredients);
            if (recipes.length === 0) {
                res.status(200).json('There are no recipes');
            }
            else {
                res.status(200).json(recipes);
            }
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/recipes/:name', function(req, res) {
    res.contentType('application/json');
    Recipe.find({ name: req.params.name} )
        .then((recipes) => {
            console.log(recipes);
            if (recipes.length === 0) {
                res.status(200).json('There are no recipes');
            }
            else {
                res.status(200).json(recipes);
            }
        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/recipes', function(req, res) {
    Recipe.create({
        name: req.body.name,
        imageURL: req.body.imageURL,
        description: req.body.description,
        ingredients: req.body.ingredients
    }, function(err, result) {
        if (err) return res.send(err);
        res.send(result);
        console.log(result);
    })
});

routes.put('/recipes/:name', function(req, res) {
    Recipe.findOneAndUpdate({name: req.params.name},
        {name: req.body.name,
            imageURL: req.body.imageURL,
            description: req.body.description,
            ingredients: req.body.ingredients}
        , function(err, result) {
            if (err) return res.send(err);
            res.send(result);
        })
});

routes.delete('/recipes/:name', function(req, res) {
    Recipe.remove({name: req.params.name},
        function (err, result) {
            if (err) return res.send(err);
            res.send(result);
        });
});

module.exports = routes;


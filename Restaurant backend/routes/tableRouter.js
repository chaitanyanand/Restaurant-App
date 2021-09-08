const express = require('express');

const Tables = require('../models/tables')
const tableRouter = express.Router();
const cors = require('./cors');
tableRouter.use(express.json());
var authenticate = require('../authenticate');

tableRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Tables.find({})
            .then((tables) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(tables);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        req.body.username = req.user.firstname + " " + req.user.lastname;
        Tables.create(req.body)
            .then((table) => {
                console.log('table Created ', JSON.stringify(table));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(table);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

tableRouter.route('/:tableId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Tables.findByIdAndRemove(req.params.tableId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = tableRouter;
const express = require('express');

const Feedbacks = require('../models/feedbacks')
const feedbackRouter = express.Router();
const cors = require('./cors');
const authenticate = require('../authenticate')

feedbackRouter.use(express.json());

feedbackRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Feedbacks.find(req.query)
            .then((feedbacks) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedbacks);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Feedbacks.create(req.body)
            .then((feedback) => {
                console.log('feedback Created ', JSON.stringify(feedback));
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(feedback);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /feedbacks');
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        Feedbacks.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = feedbackRouter;
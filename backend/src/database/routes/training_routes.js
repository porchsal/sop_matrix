const express = require("express");
const router = express.Router();
const trainingQueries = require("../queries/training_queries");

router.get("/training", (req, res) => {
    trainingQueries.getAllTrainingById()    
    .then((training) => {
        res.json(training);
    return;
    });
});

router.get("/training/:trainingId", (req, res) => {
    trainingQueries.getTrainingById(req.params.trainingId)
    .then((training) => {
        res.json(training);
    return;
    });
});

router.get("/NewTraining", (req, res) => {
    res.send("New Training");
});

module.exports = router;
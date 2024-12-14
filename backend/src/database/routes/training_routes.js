const express = require("express");
const router = express.Router();
const trainingQueries = require("../queries/training_queries");

router.get("/training", (req, res) => {
    trainingQueries.getAllTrainings()    
    .then((training) => {
        res.json(training);
    return;
    });
});

module.exports = router;
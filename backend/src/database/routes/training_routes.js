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

router.post("/training/newtraining", async (req, res) => {
    const { training_name, sop_number, sop_name, trainer_name, comments, site_name, position_name, department_name, training_date, employee_name } = req.body;
    try {
        const result = await trainingQueries.addTraining(training_name, sop_number, sop_name, trainer_name, comments, site_name, position_name, department_name, training_date, employee_name);
        res.status(200).send({ message: 'Training added successfully', result });
    } catch (error) {
        console.error('Error adding Training:', error);
        res.status(500).send({ message: 'Error adding Training', error });
    }
});
module.exports = router;
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

router.get("/training/byEmployee/:employeeId", (req, res) => {
    trainingQueries.getTrainingByEmployeeId(req.params.employeeId)
    .then((training) => {
        res.json(training);
    return;
    });
});

router.get("/NewTraining", (req, res) => {
    res.send("New Training");
});

router.post("/training/newtraining", async (req, res) => {
    const { training_name, sop_number, sop_name, trainer_name, comments, training_date, employee_ids, related_to, type_training, description, assessment } = req.body;
    try {
        const result = await trainingQueries.addTraining(training_name, sop_number, sop_name, trainer_name, comments, training_date, employee_ids, related_to, type_training, description, assessment);
        res.status(200).send({ message: 'Training added successfully', result });
    } catch (error) {
        console.error('Error adding Training:', error);
        res.status(500).send({ message: 'Error adding Training', error });
    }
});

router.get("/training/sopnumber/:sopNumber", async (req, res) => {
     const sopNumber = req.params.sopNumber.replace(/~/g, "/");
    trainingQueries.getTrainingBySopNumber(sopNumber)
    .then((training) => {
        res.json(training);
    })
    .catch((error) => {
        console.error('Error getting training:', error);
        res.status(500).send({ message: 'Error getting training', error });
    });
});

router.get('/training/details/:id', (req, res) => {
    trainingQueries.getTrainingEmployeeByTrainingId(req.params.id)
    .then((training) => {
        res.json(training);
    })
    .catch((error) => {
        console.error('Error getting training:', error);
        res.status(500).send({ message: 'Error getting training', error });
    });
});

router.delete('/training/delete/:id', (req, res) => {
    trainingQueries.deleteTrainingByID(req.params.id)
    .then((training) => {
        res.json(training);
    })
    .catch((error) => {
        console.error('Error deleting training:', error);
        res.status(500).send({ message: 'Error deleting training', error });
    });
});

module.exports = router;
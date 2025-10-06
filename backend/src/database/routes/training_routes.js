const express = require("express");
const router = express.Router();
const trainingQueries = require("../queries/training_queries");
const auth_middleware = require("../middleware/authMiddleware");
const auditLogger = require("../middleware/auditLogger");

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

router.post("/training/newtraining", auth_middleware, auditLogger('CREATE', 'Training', (req) => `${req.body.training_name} - ${req.body.sop_number}`),
 async (req, res) => {
    const { training_name, sop_number, sop_name, trainer_name, comments, training_date, employee_ids, type_training, description, assessment, control, version } = req.body;
    try {
        const result = await trainingQueries.addTraining(training_name, sop_number, sop_name, trainer_name, comments, training_date, employee_ids, type_training, description, assessment, control, version);
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

// router.delete('/training/delete/:id',
//      auth_middleware, 
//      auditLogger('Delete', 'Training', (req) => (`${req.body.training_name} - ${req.body.sop_number}`),
//     async (req, res) => {
//     trainingQueries.deleteTrainingByID(req.params.id)
//     .then((training) => {
//         res.json(training);
//     })
//     .catch((error) => {
//         console.error('Error deleting training:', error);
//         res.status(500).send({ message: 'Error deleting training', error });
//     });
// }
// ));

router.delete('/training/delete/:id', 
    auth_middleware,
    async (req, res, next) => {
      try {
        const trainingRows = await trainingQueries.getTrainingById(req.params.id);
        
        if (!trainingRows || trainingRows.length === 0) {
          return res.status(404).json({ message: 'Training not found' });
        }
  
        req.training = trainingRows[0]; // Attach training details to req for auditLogger
        next();
      } catch (error) {
        console.error('Error fetching training before delete:', error);
        res.status(500).send({ message: 'Error fetching training', error });
      }
    },
    auditLogger('DELETE', 'Training', (req) => {
      return req.training ? `${req.training.training_name} - ${req.training.sop_number}` : null;
    }),
    async (req, res) => {
      try {
       await trainingQueries.deleteTrainingById(req.params.id);
        res.json({ message: 'Training deleted successfully' });
      } catch (error) {
        console.error('Error deleting training:', error);
        res.status(500).send({ message: 'Error deleting training', error });
      }
    }
  );




module.exports = router;
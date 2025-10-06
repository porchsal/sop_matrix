const express = require("express");
const router = express.Router();
const positionQueries = require("../queries/position_queries");
const auditLogger = require("../middleware/auditLogger");
const auth_middleware = require("../middleware/authMiddleware");

router.get("/position", (req, res) => {
    positionQueries.getAllPositions()    
    .then((position) => {
        res.json(position);
    return;
    });
});

router.get("/position/name", (req, res) => {
    positionQueries.getAllPositionsNames()    
    .then((position) => {
        res.json(position);
    return;
    })
    .catch((err) => {
        console.error('Error getting positions:', err);
    });
});

router.post('/positionsbydep', async (req, res) => {
    const { departments } = req.body;
    if (!departments || departments.length === 0) {
        res.status(400).json({ error: 'No departments provided' });
        return;
    }
    try {
        const results = await positionQueries.getAllPositionsByDep(departments);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error getting positions by department' });
    }
})

router.post('/position/add',
    auth_middleware,
    auditLogger('CREATE', 'POSITION', (req) => req.body.position_name ),
    async (req, res) => {
    const { position_name, department_id } = req.body;
        console.log("req.body:",req.body);
    try {
        const result = await positionQueries.addPosition(position_name, department_id);
        res.status(200).send({ message: 'Position added successfully', result });
    } catch (error) {
        console.error('Error adding position:', error);
        res.status(500).send({ message: 'Error adding position', error });
    }
});

module.exports = router;
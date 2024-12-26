const express = require("express");
const router = express.Router();
const positionQueries = require("../queries/position_queries");

router.get("/position", (req, res) => {
    positionQueries.getAllPositions()    
    .then((position) => {
        console.log(position);
        res.json(position);
    return;
    });
});

router.get("/position/name", (req, res) => {
    positionQueries.getAllPositionsNames()    
    .then((position) => {
        console.log(position);
        res.json(position);
    return;
    })
    .catch((err) => {
        console.error('Error getting positions:', err);
    });
});

// router.get("/positionsbydep", (req, res) => {
//     positionQueries.getAllPositionsByDep()    
//     .then((position) => {
//         console.log(position);
//         res.json(position);
//     return;
//     });
// });

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

// router.get("/position/filter", (req, res) => {
//     const { departmentIds } = req.body;

//     if ( !Array.isArray(departmentIds) || departmentIds.length === 0 ) {
//     return res.status(400).json({ error: 'No departments selected' });
//     }

//     try {
//         const result

module.exports = router;
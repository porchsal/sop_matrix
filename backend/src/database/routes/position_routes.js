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
module.exports = router;
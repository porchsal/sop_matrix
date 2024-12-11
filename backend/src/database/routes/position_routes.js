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

module.exports = router;
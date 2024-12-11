const express = require("express");
const router = express.Router();
const sopQueries = require("../queries/sop_queries");

router.get("/sop", (req, res) => {
    sopQueries.getAllSop()    
    .then((sop) => {
        res.json(sop);
    return;
    });
});

module.exports = router;
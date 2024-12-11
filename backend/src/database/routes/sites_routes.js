const express = require("express");
const router = express.Router();
const sitesQueries = require("../queries/sites_queries");

router.get("/sites", (req, res) => {
    sitesQueries.getAllSites()    
    .then((sites) => {
        //console.log(sites);
        res.json(sites);
    return;
    });
});

module.exports = router;
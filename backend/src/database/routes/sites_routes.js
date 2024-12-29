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

router.get('/sites/saludo', (req, res) => {
    res.send('Hola desde la ruta de sitios');
});
module.exports = router;
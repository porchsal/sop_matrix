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

router.post("/sites/add", async (req, res) => {
    const { site_name } = req.body;
    console.log('Site name:', site_name);

    try {
        const result = await sitesQueries.addSite(site_name);
        res.status(200).send({ message: 'Site added successfully', result });
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).send({ message: 'Error adding site', error });
    }
    const newSite = { id: Date.now(), site_name }
    console.log('New Site:', newSite);

});

router.get('/sites/saludo', (req, res) => {
    res.send('Hola desde la ruta de sitios');
});
module.exports = router;
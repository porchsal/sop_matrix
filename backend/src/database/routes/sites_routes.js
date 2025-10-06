const express = require("express");
const router = express.Router();
const sitesQueries = require("../queries/sites_queries");
const auditLogger = require("../middleware/auditLogger");
const auth_middleware = require("../middleware/authMiddleware");
router.get("/sites", (req, res) => {
    sitesQueries.getAllSites()    
    .then((sites) => {
        res.json(sites);
    return;
    });
});

router.post("/sites/add",
    auth_middleware, 
    auditLogger('CREATE', 'SITE', (req) => req.body.site_name ),
    
    async (req, res) => {
    const { site_name } = req.body;
    

    try {
        const result = await sitesQueries.addSite(site_name);
        res.status(200).send({ message: 'Site added successfully', result });
    } catch (error) {
        console.error('Error adding site:', error);
        res.status(500).send({ message: 'Error adding site', error });
    }
    const newSite = { id: Date.now(), site_name }


});

router.get('/sites/saludo', (req, res) => {
    res.send('Hola desde la ruta de sitios');
});
module.exports = router;
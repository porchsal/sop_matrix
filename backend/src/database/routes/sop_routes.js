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


router.post("/sop/newsop", async (req, res) => {
    const { sop_number, sop_name, topic, effective_date, link, comment, active } = req.body;
    try {
        const result = await sopQueries.addSop(sop_number, sop_name, topic, effective_date, link, comment, active);
        res.status(200).send({ message: 'SOP added successfully', result });
    } catch (error) {
        console.error('Error adding SOP:', error);
        res.status(500).send({ message: 'Error adding SOP', error });
    }
});

router.put('/sop/:id', async (req, res) => {
    const { id } = req.params;
    const { sop_number, sop_name, topic, effective_date, link, comment, active } = req.body;
    try {
        const result = await sopQueries.updateSop(id, sop_number, sop_name, topic, effective_date, link, comment, active);
        res.status(200).send({ message: 'SOP updated successfully', result });
    } catch (error) {
        console.error('Error updating SOP:', error);
        res.status(500).send({ message: 'Error updating SOP', error });
    }
});

router.get("/sop/inactive", (req, res) => {
    sopQueries.getInactiveSop()
    .then((sop) => {
        res.json(sop);
    return;
    });
});


router.get("/sop/:sopId", (req, res) => {
    sopQueries.getSopByNumber(req.params.sopId)
    .then((sop) => {
        res.json(sop);
    return;
    });
});

module.exports = router;
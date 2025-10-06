const express = require('express');
const router = express.Router();
const auditQueries = require('../queries/audit_queries');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/audit-trail', 
    authMiddleware, 
    async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const audits = await auditQueries.getAllAudits(startDate, endDate);
            res.json(audits);
        } catch (error) {
            console.error('Error fetching audit logs:', error);
            res.status(500).send({ message: 'Error fetching audit logs', error });  
        }
});


module.exports = router;
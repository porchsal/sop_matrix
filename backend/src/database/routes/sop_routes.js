const express = require("express");
const router = express.Router();
const sopQueries = require("../queries/sop_queries");
const auditLogger = require("../middleware/auditLogger");
const auth_middleware = require("../middleware/authMiddleware");

router.get("/sop", (req, res) => {
    sopQueries.getAllSop()    
    .then((sop) => {
        res.json(sop);
    return;
    });
});


// router.post("/sop/newsop", auth_middleware, auditLogger('CREATE', 'SOP', (req) => req.body.sop_number ), 
//     async (req, res) => {
//         const { sop_number, sop_name, topic, effective_date, link, comment, active } = req.body;
//         try {
//             const result = await sopQueries.addSop(sop_number, sop_name, topic, effective_date, link, comment, active);
//             res.status(200).send({ message: 'SOP added successfully', result });
//         } catch (error) {
//             console.error('Error adding SOP:', error);
//             res.status(500).send({ message: 'Error adding SOP', error });
//         }
// });

router.post(
    "/sop/newsop",
    auth_middleware,
    auditLogger('CREATE', 'SOP', (req) => req.body.sop_number),
    async (req, res) => {
        const {
            sop_number,
            sop_name,
            topic,
            effective_date,
            link,
            comment,
            active,
            positions
        } = req.body;

        if (positions && !Array.isArray(positions)) {
            return res.status(400).send({ message: 'positions must be an array' });
        }

        try {
            const result = await sopQueries.addSop(
                sop_number,
                sop_name,
                topic,
                effective_date,
                link,
                comment,
                active,
                positions || []
            );

            res.status(200).send({
                message: 'SOP added successfully',
                result
            });
        } catch (error) {
            console.error('Error adding SOP:', error);
            res.status(500).send({
                message: 'Error adding SOP',
                error : {
            message: error.message,
            code: error.code,
            errno: error.errno,
            sqlMessage: error.sqlMessage,
            sqlState: error.sqlState
                }
            });
        }
    }
);

// router.put('/sop/:id', auth_middleware, auditLogger('UPDATE', 'SOP', (req => req.body.sop_number) ),
//     async (req, res) => {
//         const { id } = req.params;
//         const { sop_number, sop_name, topic, effective_date, link, comment, active } = req.body;
//         try {
//             const result = await sopQueries.updateSop(id, sop_number, sop_name, topic, effective_date, link, comment, active);
//             res.status(200).send({ message: 'SOP updated successfully', result });
//         } catch (error) {
//             console.error('Error updating SOP:', error);
//             res.status(500).send({ message: 'Error updating SOP', error });
//         }
// });

router.put(
    '/sop/:id',
    auth_middleware,
    auditLogger('UPDATE', 'SOP', (req) => req.body.sop_number),
    async (req, res) => {
        const { id } = req.params;

        const {
            sop_number,
            sop_name,
            topic,
            effective_date,
            link,
            comment,
            active,
            positions
        } = req.body;

        try {
            const result = await sopQueries.updateSop(
                id,
                sop_number,
                sop_name,
                topic,
                effective_date,
                link,
                comment,
                active,
                positions || []
            );

            res.status(200).send({
                message: 'SOP updated successfully',
                result
            });
        } catch (error) {
            console.error('Error updating SOP:', error);
            res.status(500).send({
                message: 'Error updating SOP',
                error: {
                    message: error.message,
                    code: error.code,
                    errno: error.errno,
                    sqlMessage: error.sqlMessage,
                    sqlState: error.sqlState
                }
            });
        }
    }
);

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

router.get("/sop/:sopId/positions", auth_middleware, async(req, res) => {
    try {
        const result = await sopQueries.getSopPositions(req.params.sopId);
        res.status(200).send(result);
    } catch (error) {
        console.error('Error fetching SOP positions:', error);
        res.status(500).send({ message: 'Error fetching SOP positions',
            error: {
                message: error.message,
                code: error.code,
                sqlMessage: error.sqlMessage
            }
        
        });
    }
});


module.exports = router;
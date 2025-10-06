const express = require("express");
const router = express.Router();
const departmentQueries = require("../queries/department_queries");
const auditLogger = require("../middleware/auditLogger");
const auth_middleware = require("../middleware/authMiddleware");

router.get("/department", (req, res) => {
    departmentQueries.getAllDepartments()    
    .then((departments) => {
       res.json(departments);
    return;
    });
});

router.post("/department/add",
    auth_middleware, 
    auditLogger('CREATE', 'DEPARTMENT', (req) => req.body.dep_name ),
    async (req, res) => {
    const { dep_name } = req.body;
    

    try {
        const result = await departmentQueries.addDepartment(dep_name);
        res.status(200).send({ message: 'Department added successfully', result });
    } catch (error) {
        console.error('Error adding department:', error);
        res.status(500).send({ message: 'Error adding department', error });
    }
    const newDepartment = { id: Date.now(), dep_name }
   

});

module.exports = router;
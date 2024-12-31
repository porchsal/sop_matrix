const express = require("express");
const router = express.Router();
const departmentQueries = require("../queries/department_queries");

router.get("/department", (req, res) => {
    departmentQueries.getAllDepartments()    
    .then((departments) => {
        //console.log(departments);
        res.json(departments);
    return;
    });
});

router.post("/department/add", async (req, res) => {
    const { dep_name } = req.body;
    console.log('Department name:', dep_name);

    try {
        const result = await departmentQueries.addDepartment(dep_name);
        res.status(200).send({ message: 'Department added successfully', result });
    } catch (error) {
        console.error('Error adding department:', error);
        res.status(500).send({ message: 'Error adding department', error });
    }
    const newDepartment = { id: Date.now(), dep_name }
    console.log('New Department:', newDepartment);

});

module.exports = router;
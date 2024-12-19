const express = require("express");
const router = express.Router();
const employeeQueries = require("../queries/employee_queries");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.get("/employee", (req, res) => {
    employeeQueries.getAllEmployees()    
    .then((employee) => {
        //console.log(employee);
        res.json(employee);
    return;
    });
});

router.get("/employee/:id", (req, res) => {
    const { id } = req.params;
    employeeQueries.getEmployeeById(id)
    .then((employee) => {
        res.json(employee);
    return;
    });
});

router.put('/employee/:id', async (req, res) => {
    const { id } = req.params;
    const { name, date_of_hire, active, trainer, position_id, department_id, site_id } = req.body;
    //employeeQueries.updateEmployee(id, name, date_of_hire, active, trainer, position_id, department_id, site_id)
    try {
        const result = await employeeQueries.updateEmployee(id, name, date_of_hire, active, trainer, position_id, department_id, site_id);
        res.status(200).send({ message: 'Employee updated successfully', result });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).send({ message: 'Error updating employee', error });
    }
});

// router.put('/employee/new', async (req, res) => {
//     const { name, date_of_hire, active, trainer, position_id, department_id, site_id } = req.body;
//     //employeeQueries.addEmployee(name, date_of_hire, active, trainer, position_id, department_id, site_id)
//     try {
//         const result = await employeeQueries.addEmployee(name, date_of_hire, active, trainer, position_id, department_id, site_id);
//         res.status(200).send({ message: 'Employee added successfully', result });
//     } catch (error) {
//         console.error('Error adding employee:', error);
//         res.status(500).send({ message: 'Error adding employee', error });
//     }
// });

router.post('/employee/new', async (req, res) => {
    const { name, date_of_hire, active, trainer, position_id, department_id, site_id } = req.body;
    //employeeQueries.addEmployee(name, date_of_hire, active, trainer, position_id, department_id, site_id)
    try {
        const result = await employeeQueries.addEmployee(name, date_of_hire, active, trainer, position_id, department_id, site_id);
        res.status(200).send({ message: 'Employee added successfully', result });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send({ message: 'Error adding employee', error });
    }
});
module.exports = router;
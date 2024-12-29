const express = require("express");
const router = express.Router();
const employeeQueries = require("../queries/employee_queries");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

router.get('/employee/filter', async (req, res) => {
    const { site_id, position_id } = req.query;
    console.log('Request query:', req.query);

        try {
            const result = await employeeQueries.getEmployeeBySiteAndPosition(site_id, position_id);
            res.json(result);
        } catch (error) {
            console.error('Error getting employee:', error);
            res.status(500).send({ message: 'Error getting employee', error });
        }
 

});

router.get('/employee/trainer', (req, res) => {
    try {
        employeeQueries.getEmployeesTrainers()
        .then((result) => {
            res.json(result);
        });
    } catch (error) {
        console.error('Error getting trainer:', error);
        res.status(500).send({ message: 'Error getting trainer', error });
    }
});

router.get('/employee/saludo', (req, res) => {
    res.send('Hola Mundo');
});

router.get("/employee", (req, res) => {
    employeeQueries.getAllEmployees()    
    .then((employee) => {
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



router.post('/employee/new', async (req, res) => {
    const { name, date_of_hire, active, trainer, position_id, department_id, site_id } = req.body;
    try {
        const result = await employeeQueries.addEmployee(name, date_of_hire, active, trainer, position_id, department_id, site_id);
        res.status(200).send({ message: 'Employee added successfully', result });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send({ message: 'Error adding employee', error });
    }
});








module.exports = router;
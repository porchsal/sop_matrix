const express = require("express");
const router = express.Router();
const employeeQueries = require("../queries/employee_queries");

router.get("/employee", (req, res) => {
    employeeQueries.getAllEmployees()    
    .then((employee) => {
        console.log(employee);
        res.json(employee);
    return;
    });
});

module.exports = router;
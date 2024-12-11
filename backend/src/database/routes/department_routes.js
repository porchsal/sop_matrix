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

module.exports = router;
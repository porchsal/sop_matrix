const db = require("../connection");

const getAllEmployees = () => { 
    return new Promise((resolve, reject) => { 
        //db.query('SELECT id AS ID, name AS Name, date_of_hire AS "Date of Hire", active AS Active, trainer AS Trainer, position_id AS Position, department_id AS Department, site_id AS Site FROM employee;', (err, rows) => { 
        db.query('SELECT * FROM employee', (err, rows) => {    
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            // console.log('Query result:', rows);
             resolve(rows);
             });        
        });
};  

const getEmployeeById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const updateEmployee = (id, name, date_of_hire, active, trainer, position_id, department_id, site_id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE employee SET name = ?, date_of_hire = ?, active = ?, trainer = ?, position_id = ?, department_id = ?, site_id = ? WHERE id = ?', [name, date_of_hire, active, trainer, position_id, department_id, site_id, id], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
};

const addEmployee = (name, date_of_hire, active, trainer, position_id, department_id, site_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO employee (name, date_of_hire, active, trainer, position_id, department_id, site_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, date_of_hire, active, trainer, position_id, department_id, site_id], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}





module.exports = {
  getAllEmployees,
    updateEmployee,
    getEmployeeById,
    addEmployee
};
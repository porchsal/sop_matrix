const db = require("../connection");

const getAllDepartments = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT id AS ID, dep_name AS Name FROM departments', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            
             resolve(rows);
             });        
        });
};  

const addDepartment = (dep_name) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO departments (dep_name) VALUES (?)', [dep_name], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
  getAllDepartments,
    addDepartment
};
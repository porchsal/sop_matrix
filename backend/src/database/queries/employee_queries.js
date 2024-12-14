const db = require("../connection");

const getAllEmployees = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT id AS ID name AS Name, date_of_hire AS "Date of Hire", active AS Active, trainer AS Trainer, position_id AS Position, department_id AS Department, site_id AS Site FROM employee;', (err, rows) => { 
//        db.query('SELECT * FROM sop', (err, rows) => {    
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            console.log('Query result:', rows);
             resolve(rows);
             });        
        });
};  


module.exports = {
  getAllEmployees
};
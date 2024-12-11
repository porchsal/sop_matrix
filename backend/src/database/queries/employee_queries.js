const db = require("../connection");

const getAllEmployees = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM employee', (err, rows) => { 
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
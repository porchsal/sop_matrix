const db = require("../connection");

const getAllDepartments = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM departments', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            //console.log('Query result:', rows);
             resolve(rows);
             });        
        });
};  


module.exports = {
  getAllDepartments
};
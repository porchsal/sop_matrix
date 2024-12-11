const db = require("../connection");

const getAllSop = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM sop', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            resolve(rows);
             });        
        });
};  


module.exports = {
  getAllSop
};
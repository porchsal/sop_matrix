const db = require("../connection");

const getAllPositions = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM position', (err, rows) => { 
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
  getAllPositions
};
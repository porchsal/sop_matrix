const db = require("../connection");

const getAllSites = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM sites', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            
             resolve(rows);
             });        
        });
};  


module.exports = {
  getAllSites
};
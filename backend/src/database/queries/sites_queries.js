const db = require("../connection");

const getAllSites = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT id AS ID, site_name AS Name FROM sites', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            
             resolve(rows);
             });        
        });
};  

const addSite = (site_name) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO sites (site_name) VALUES (?)', [site_name], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
  getAllSites,
    addSite
};
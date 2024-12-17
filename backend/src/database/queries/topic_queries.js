const db = require("../connection");

const getAllTopics = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM topic', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
                resolve(rows);
             });        
        });
};  


module.exports = {
  getAllTopics
};
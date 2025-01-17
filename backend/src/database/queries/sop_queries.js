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

const addSop = (sop_number, sop_name, topic, effective_date, link, comment, active) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO sop (sop_number, sop_name, topic, effective_date, link, comment, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [sop_number, sop_name, topic, effective_date, link, comment, active],
            (err, result) => {
                if (err) {
                    console.error('Database query error:', err);
                    return reject(err);
                }
                resolve(result);
            });
    });
}

const getSopByNumber = (sopId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM sop WHERE sop_number = ?', [sopId], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}


module.exports = {
  getAllSop,
    addSop,
    getSopByNumber
};
const db = require("../connection");

const getAllPositions = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM position', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            //  console.log('Query result:', rows);
             resolve(rows);
             });        
        });
};  

const getAllPositionsNames = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT position_name FROM position', (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            // console.log('Query result:', rows);
            resolve(rows);
        });
    });
}

const getAllPositionsByDep = (departments) => {
    const placeholders= departments.map(() => '?').join(',');
    return new Promise((resolve, reject) => {
        db.query('SELECT p.id, p.position_name, d.dep_name FROM position p JOIN department d ON p.department_id = d.id WHERE d.dep_name IN (${placeholders}) ', departments, (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            // console.log('Query result:', rows);
            resolve(rows);
        }); 
    });
};

const getPositionsByIds = (positionIds) => {
    const placeholders = positionIds.map(() => '?').join(',');
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM position WHERE id IN (${placeholders})`;

        // Execute the query with the positionIds as values
        db.query(query, positionIds, (err, rows) => {
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
  getAllPositions,
  getAllPositionsNames,
    getAllPositionsByDep
};
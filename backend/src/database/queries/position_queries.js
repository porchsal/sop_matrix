const db = require("../connection");

const getAllPositions = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT id AS ID, position_name AS Name, department_id AS department_id FROM position', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
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
            resolve(rows);
        });
    });
};

const addPosition = (position_name, department_id) => {
    console.log('Position name:', position_name);
    console.log('Department ID:', department_id);
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO `position` (position_name, department_id) VALUES (?, ?)', [position_name, department_id], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

module.exports = {
  getAllPositions,
  getAllPositionsNames,
    getAllPositionsByDep,
    getPositionsByIds,
    addPosition
};
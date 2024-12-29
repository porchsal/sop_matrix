const db = require("../connection");

const getAllEmployees = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM employee', (err, rows) => {    
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            
             resolve(rows);
             });        
        });
};  

const getEmployeeById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const updateEmployee = (id, name, date_of_hire, active, trainer, position_id, department_id, site_id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE employee SET name = ?, date_of_hire = ?, active = ?, trainer = ?, position_id = ?, department_id = ?, site_id = ? WHERE id = ?', [name, date_of_hire, active, trainer, position_id, department_id, site_id, id], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
};

const addEmployee = (name, date_of_hire, active, trainer, position_id, department_id, site_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO employee (name, date_of_hire, active, trainer, position_id, department_id, site_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, date_of_hire, active, trainer, position_id, department_id, site_id], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}


// const getEmployeeBySiteAndPosition = (site_id, position_id) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT  * FROM employee WHERE site_id = ? AND position_id = ?', [site_id, position_id], (err, rows) => {
//             if (err) {
//                 console.error('Database query error:', err);
//                 return reject(err);
//             }
//             resolve(rows);
//         });
//     })
// }

const getEmployeeBySiteAndPosition = (site_ids = [], position_ids = []) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM employee WHERE 1=1'; // Base query
        const params = [];

        if (site_ids.length > 0) {
            query += ' AND site_id IN (?)';
            params.push(site_ids);
        }
        
        if (position_ids.length > 0) {
            query += ' AND position_id IN (?)';
            params.push(position_ids);
        }

        db.query(query, params, (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
};

const getEmployeesTrainers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM employee WHERE trainer = "Yes"', (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}


module.exports = {
  getAllEmployees,
    updateEmployee,
    getEmployeeById,
    addEmployee,
    getEmployeeBySiteAndPosition,
    getEmployeesTrainers
};
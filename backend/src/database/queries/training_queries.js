const db = require("../connection");

const getAllTrainings = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM training', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            console.log('Trainings:', rows);
            resolve(rows);
             });        
        });
};  

const getTrainingById = (trainingId) => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT DISTINCT training_id, training_name, sop_number, sop_name FROM training WHERE training_id = ? ', [trainingId], (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            console.log('Training:', rows);
            resolve(rows);
             });        
        });
};

const getTrainingByEmployeeId = (employeeId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM training WHERE employee_id = ?', [employeeId], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
};

const getAllTrainingById = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT DISTINCT training_id, training_name, sop_number, sop_name FROM training', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            console.log('Training again:', rows);
            resolve(rows);
             });        
        });
};

// Get the maximum training_id
const maxTrainingId = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT MAX(training_id) AS max_training_id FROM training', (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows[0].max_training_id || 0); // Default to 0 if no records exist
        });
    });
};



// Add a new training record
const addTraining = async (training_name, sop_number, sop_name, trainer_name, comments, training_date, employee_ids) => {
    console.log('Training Date:', training_date);
    console.log('Employee IDs:', employee_ids);
    if (!Array.isArray(employee_ids) || employee_ids.length === 0) {
        throw new Error('employee_ids must be a non-empty array');
    }

    try {

        const currentMaxTrainingId = await maxTrainingId();
        let training_id = currentMaxTrainingId + 1;
        // Fetch site_id, position_id, and department_id for each employee_id
        const employeeDetailsQuery = `
            SELECT id, site_id, position_id, department_id 
            FROM employee 
            WHERE id IN (?);
        `;
        const [employeeDetails] = await db.promise().query(employeeDetailsQuery, [employee_ids]);

        if (employeeDetails.length === 0) {
            throw new Error('No employees found for the provided IDs');
        }

        // Prepare training insert values
        const trainingValues = employeeDetails.map(({ id, site_id, position_id, department_id }) => [
            training_id,
            training_name,
            sop_number,
            sop_name,
            trainer_name,
            comments,
            site_id,
            position_id,
            department_id,
            training_date,
            id
        ]);
        console.log('Training values:', trainingValues);
        // Insert training records
        const insertTrainingQuery = `
            INSERT INTO training (
                training_id, training_name, sop_number, sop_name, trainer_name, comments, 
                site_id, position_id, department_id, training_date, employee_id
            ) 
            VALUES ?;
        `;
        const [result] = await db.promise().query(insertTrainingQuery, [trainingValues]);

        return result;
    } catch (err) {
        console.error('Error adding training:', err);
        throw err;
    }
};



module.exports = {
  getAllTrainings,
  getTrainingById,
  getAllTrainingById,
  addTraining,
  maxTrainingId,
  getTrainingByEmployeeId
};
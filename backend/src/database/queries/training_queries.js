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

const addTraining = (training_name, sop_number, sop_name, trainer_name, comments, site_name, position_name, department_name, training_date, employee_name) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO training (training_name, sop_number, sop_name, trainer_name, comments, site_name, position_name, department_name, training_date, employee_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [training_name, sop_number, sop_name, trainer_name, comments, site_name, position_name, department_name, training_date, employee_name],
            (err, result) => {
                if (err) {
                    console.error('Database query error:', err);
                    return reject(err);
                }
                resolve(result);
            });
    });
};


module.exports = {
  getAllTrainings,
  getTrainingById,
  getAllTrainingById,
  addTraining
};
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



module.exports = {
  getAllTrainings,
  getTrainingById,
  getAllTrainingById
};
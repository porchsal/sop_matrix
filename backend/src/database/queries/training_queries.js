const db = require("../connection");

const getAllTrainings = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM training', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
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
        db.query('SELECT DISTINCT training_id, training_name, sop_number, sop_name, trainer_name, comments, training_date, type_training, description FROM training', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 

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
// const addTraining = async (training_name, sop_number, sop_name, trainer_name, comments, training_date, employee_ids, type_training, description, assessment, control, version) => {
//     if (!Array.isArray(employee_ids) || employee_ids.length === 0) {
//         throw new Error('employee_ids must be a non-empty array');
//     }
//     try {
//         const currentMaxTrainingId = await maxTrainingId();
//         let training_id = currentMaxTrainingId + 1;
//         // Fetch site_id, position_id, and department_id for each employee_id
//         const employeeDetailsQuery = `
//             SELECT id, site_id, position_id, department_id 
//             FROM employee 
//             WHERE id IN (?);
//         `;
//         const [employeeDetails] = await db.promise().query(employeeDetailsQuery, [employee_ids]);
//         if (employeeDetails.length === 0) {
//             throw new Error('No employees found for the provided IDs');
//         }
//         // Prepare training insert values
//         const trainingValues = employeeDetails.map(({ id, site_id, position_id, department_id }) => [
//             training_id,
//             training_name,
//             sop_number,
//             sop_name,
//             trainer_name,
//             comments,
//             site_id,
//             position_id,
//             department_id,
//             training_date,
//             id,
//             type_training,
//             description, 
//             assessment,
//             control,
//             version
//         ]);
//         // Insert training records
//         const insertTrainingQuery = `
//             INSERT INTO training (
//                 training_id, training_name, sop_number, sop_name, trainer_name, comments, 
//                 site_id, position_id, department_id, training_date, employee_id, type_training, description, 
//                 assessment, control, version
//             ) 
//             VALUES ?;
//         `;
//         const [result] = await db.promise().query(insertTrainingQuery, [trainingValues]);
//         return result;
//     } catch (err) {
//         console.error('Error adding training:', err);
//         throw err;
//     }
// };

// 

const addTraining = async (training_name, sop_number, sop_name, trainer_name, comments, training_date, employee_ids, type_training, description, assessment, control, version) => {
    if (!Array.isArray(employee_ids) || employee_ids.length === 0) {
        throw new Error('employee_ids must be a non-empty array');
    }

    try {
        console.log('=== DEBUG addTraining ===');
        console.log('SOP Number:', sop_number);
        console.log('Employee IDs:', employee_ids);

        const currentMaxTrainingId = await maxTrainingId();
        let training_id = currentMaxTrainingId + 1;

        // 1. Obtener el SOP ID
        const [sopResult] = await db.promise().query(
            'SELECT id FROM sop WHERE sop_number = ?', 
            [sop_number]
        );

        console.log('SOP Query Result:', sopResult);

        if (!sopResult || sopResult.length === 0) {
            throw new Error(`SOP not found with number: ${sop_number}`);
        }

        const sopId = sopResult[0].id;
        console.log('SOP ID found:', sopId);

        // 2. Fetch employee details AND their sop_assignment_id
        const employeeDetailsQuery = `
            SELECT 
                e.id, 
                e.site_id, 
                e.position_id, 
                e.department_id,
                p.position_name,
                sa.id as sop_assignment_id
            FROM employee e
            JOIN position p ON e.position_id = p.id
            LEFT JOIN sop_assignments sa ON (
                sa.position_id = p.id 
                AND sa.sop_id = ?
            )
            WHERE e.id IN (?);
        `;

        const [employeeDetails] = await db.promise().query(
            employeeDetailsQuery, 
            [sopId, employee_ids]
        );

        console.log('Employee Details:', JSON.stringify(employeeDetails, null, 2));

        if (employeeDetails.length === 0) {
            throw new Error('No employees found for the provided IDs');
        }

        // 3. Verificar y crear assignments si faltan
        const employeesWithoutAssignment = employeeDetails.filter(emp => !emp.sop_assignment_id);
        
        console.log('Employees without assignment:', employeesWithoutAssignment.length);

        if (employeesWithoutAssignment.length > 0) {
            console.log('Creating missing assignments...');
            
            for (const emp of employeesWithoutAssignment) {
                console.log(`Creating assignment for employee ${emp.id}, position ${emp.position_id}, SOP ${sopId}`);
                
                const [insertResult] = await db.promise().query(
                    'INSERT INTO sop_assignments (sop_id, position_id) VALUES (?, ?)',
                    [sopId, emp.position_id]
                );
                
                emp.sop_assignment_id = insertResult.insertId;
                console.log(`✅ Created assignment ID: ${insertResult.insertId}`);
            }
        }

        console.log('Final employee details with assignments:', JSON.stringify(employeeDetails, null, 2));

        // 4. Prepare training insert values
        const trainingValues = employeeDetails.map(({ 
            id, 
            site_id, 
            position_id, 
            department_id, 
            sop_assignment_id 
        }) => [
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
            id,
            type_training,
            description, 
            assessment,
            control,
            version,
            sop_assignment_id
        ]);

        console.log('Training values to insert:', JSON.stringify(trainingValues, null, 2));

        // 5. Insert training records
        const insertTrainingQuery = `
            INSERT INTO training (
                training_id, training_name, sop_number, sop_name, trainer_name, comments, 
                site_id, position_id, department_id, training_date, employee_id, type_training, 
                description, assessment, control, version, sop_assignment_id
            ) 
            VALUES ?;
        `;

        const [result] = await db.promise().query(insertTrainingQuery, [trainingValues]);

        console.log('Insert result:', result);
        console.log('=== END DEBUG ===');

        return {
            ...result,
            training_id: training_id,
            inserted_count: employeeDetails.length
        };

    } catch (err) {
        console.error('Error adding training:', err);
        throw err;
    }
};


const getTrainingBySopNumber = (sopNumber) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT training_id, training_name, sop_number, sop_name, trainer_name, comments, training_date, type_training, description, assessment, control, version FROM training WHERE sop_number = ?', [sopNumber], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

// const getTrainingEmployeeByTrainingId = (trainingId) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT t.employee_id, e.name FROM training t INNER JOIN employee e ON t.employee_id = e.id where t.training_id= ?;', [trainingId], (err, rows) => {
//             if (err) {
//                 console.error('Database query error:', err);
//                 return reject(err);
//             }
//             resolve(rows);
//         });
//     });
// }

const getTrainingEmployeeByTrainingId = (trainingId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT 
          e.id as employee_id,
          e.name,
          e.date_of_hire,
          p.position_name,
          d.dep_name,
          s.site_name,
          t.training_date,
          t.trainer_name,
          t.comments,
          t.type_training,
          t.assessment,
          t.description
        FROM training t
        JOIN employee e ON t.employee_id = e.id
        LEFT JOIN position p ON e.position_id = p.id
        LEFT JOIN departments d ON e.department_id = d.id
        LEFT JOIN sites s ON e.site_id = s.id
        WHERE t.training_id = ?
        ORDER BY e.name
      `;

      db.query(query, [trainingId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  };


const deleteTrainingById = (trainingId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM training WHERE training_id = ?', [trainingId], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
}

const getPendingTrainings = (employeeId) => {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT 
          s.id as sop_id,
          s.sop_number,
          s.sop_name,
          s.topic,
          s.effective_date,
          s.link,
          s.comment,
          p.position_name,
          d.dep_name,
          site.site_name,
          sa.id as assignment_id
        FROM employee e
        JOIN position p ON e.position_id = p.id
        JOIN departments d ON e.department_id = d.id
        JOIN sites site ON e.site_id = site.id
        JOIN sop_assignments sa ON sa.position_id = p.id
        JOIN sop s ON s.id = sa.sop_id AND s.active = 'Yes'
        LEFT JOIN training t ON (
          t.employee_id = e.id 
          AND t.sop_assignment_id = sa.id
        )
        WHERE e.id = ?
          AND e.active = 'Yes'
          AND t.id IS NULL
        ORDER BY s.effective_date DESC, s.sop_number
      `;

        db.query(query, [employeeId], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
};

const getCompletedTrainings = (employeeId) => {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT 
          t.id as training_id,
          t.training_date,
          t.trainer_name,
          t.assessment,
          t.comments,
          t.type_training,
          s.sop_number,
          s.sop_name,
          s.topic,
          p.position_name
        FROM training t
        JOIN sop_assignments sa ON t.sop_assignment_id = sa.id
        JOIN sop s ON sa.sop_id = s.id
        JOIN position p ON sa.position_id = p.id
        WHERE t.employee_id = ?
        ORDER BY t.training_date DESC
      `;
        db.query(query, [employeeId], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
};

module.exports = {
  getAllTrainings,
  getTrainingById,
  getAllTrainingById,
  addTraining,
  maxTrainingId,
  getTrainingByEmployeeId,
  getTrainingBySopNumber,   
  getTrainingEmployeeByTrainingId,
  deleteTrainingById,
    getPendingTrainings,
    getCompletedTrainings

};
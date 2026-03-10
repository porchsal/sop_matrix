const db = require("../connection");

const getAllSop = () => { 
    return new Promise((resolve, reject) => { 
        db.query('SELECT * FROM sop where active="Yes"', (err, rows) => { 
            if (err) { 
                console.error('Database query error:', err); 
                return reject(err); 
            } 
            resolve(rows);
             });        
        });
};  

const getInactiveSop = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM sop where active="No"', (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
};

// const addSop = (sop_number, sop_name, topic, effective_date, link, comment, active) => {
//     return new Promise((resolve, reject) => {
//         db.query('INSERT INTO sop (sop_number, sop_name, topic, effective_date, link, comment, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
//             [sop_number, sop_name, topic, effective_date, link, comment, active],
//             (err, result) => {
//                 if (err) {
//                     console.error('Database query error:', err);
//                     return reject(err);
//                 }
//                 resolve(result);
//             });
//     });
// }

const addSop = (sop_number, sop_name, topic, effective_date, link, comment, active, positions = []) => {
    return new Promise((resolve, reject) => {
        const cleanPositions = Array.isArray(positions)
            ? [...new Set(positions.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0))]
            : [];

        db.query(
            'INSERT INTO sop (sop_number, sop_name, topic, effective_date, link, comment, active) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [sop_number, sop_name, topic, effective_date, link, comment, active],
            (err, result) => {
                if (err) {
                    console.error('Database query error inserting SOP:', err);
                    return reject(err);
                }

                const sopId = result.insertId;

                if (cleanPositions.length === 0) {
                    return resolve({
                        sopResult: result,
                        sopId,
                        positionsInserted: 0
                    });
                }

                let insertedCount = 0;
                let hasFailed = false;

                cleanPositions.forEach((positionId) => {
                    db.query(
                        'INSERT INTO sop_position (sop_id, position_id) VALUES (?, ?)',
                        [sopId, positionId],
                        (positionErr) => {
                            if (hasFailed) return;

                            if (positionErr) {
                                hasFailed = true;
                                console.error('Database query error inserting SOP position:', positionErr);
                                return reject(positionErr);
                            }

                            insertedCount++;

                            if (insertedCount === cleanPositions.length) {
                                resolve({
                                    sopResult: result,
                                    sopId,
                                    positionsInserted: insertedCount
                                });
                            }
                        }
                    );
                });
            }
        );
    });
};

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

// const updateSop = (id, sop_number, sop_name, topic, effective_date, link, comment, active) => {
//     return new Promise((resolve, reject) => {
//         db.query('UPDATE sop SET sop_number = ?, sop_name = ?, topic = ?, effective_date = ?, link = ?, comment = ?, active = ? WHERE id = ?',
//             [sop_number,sop_name, topic, effective_date, link, comment, active, id],
//             (err, result) => {
//                 if (err) {
//                     console.error('Database query error:', err);
//                     return reject(err);
//                 }
//                 resolve(result);
//             });
//     });
// }

const updateSop = (id, sop_number, sop_name, topic, effective_date, link, comment, active, positions = []) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE sop
             SET sop_number = ?, sop_name = ?, topic = ?, effective_date = ?, link = ?, comment = ?, active = ?
             WHERE id = ?`,
            [sop_number, sop_name, topic, effective_date, link, comment, active, id],
            (err, result) => {
                if (err) {
                    console.error('Database query error updating SOP:', err);
                    return reject(err);
                }

                db.query(
                    'DELETE FROM sop_position WHERE sop_id = ?',
                    [id],
                    (deleteErr) => {
                        if (deleteErr) {
                            console.error('Database query error deleting SOP positions:', deleteErr);
                            return reject(deleteErr);
                        }

                        const cleanPositions = Array.isArray(positions)
                            ? [...new Set(positions.map((p) => Number(p)).filter((p) => Number.isInteger(p) && p > 0))]
                            : [];

                        if (cleanPositions.length === 0) {
                            return resolve(result);
                        }

                        const values = cleanPositions.map((positionId) => [id, positionId]);

                        db.query(
                            'INSERT INTO sop_position (sop_id, position_id) VALUES ?',
                            [values],
                            (insertErr, insertResult) => {
                                if (insertErr) {
                                    console.error('Database query error inserting SOP positions:', insertErr);
                                    return reject(insertErr);
                                }

                                resolve({
                                    sopResult: result,
                                    positionsUpdated: insertResult.affectedRows,
                                });
                            }
                        );
                    }
                );
            }
        );
    });
};

const getSopPositions = (sopId) => {
    return new Promise((resolve, reject) => {
        db.query(`
            SELECT 
                sp.position_id,
                p.position_name,
                p.department_id
            FROM sop_position sp
            INNER JOIN position p ON p.id = sp.position_id
            WHERE sp.sop_id = ?
            ORDER BY p.department_id, p.position_name
            `,
            [sopId], (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
                }
                resolve(rows);
            });

        });
    };   

module.exports = {
  getAllSop,
  addSop,
  getSopByNumber,
  updateSop,
  getInactiveSop,
  getSopPositions
};
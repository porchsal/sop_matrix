const db = require("../connection");

const getAllAudits = (startDate = null, endDate = null) => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT username, role, action, entity, entity_id, created_at
            FROM audit_logs
        `;
        const params = [];

        if (startDate && endDate) {
            query += ` WHERE created_at BETWEEN ? AND ?`;
            params.push(startDate, endDate);
        }

        query += ` ORDER BY created_at DESC`;

        db.query(query, params, (err, rows) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            resolve(rows);
        });
    });
};

module.exports = {
    getAllAudits
};
const db = require("../connection");

const auditLogger = (action, entity, getEntityId, oldValue = null, newValue = null) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: user not logged in" });
        }
        const user = req.user;
        console.log("Audit Logger - User:", user);
        
        const entityId = typeof getEntityId === 'function' ? getEntityId(req) : null;
        
        const log = {
            user_id: user.id,
            username: user.username,
            role: user.role,
            action,
            entity,
            entity_id: entityId,
            old_value: oldValue ? JSON.stringify(oldValue) : null,
            new_value: newValue ? JSON.stringify(newValue) : null,
            created_at: new Date()
        };
        console.log("Audit Logger - Log:", log);
        const query = `
            INSERT INTO audit_logs 
            (user_id, username, role, action, entity, entity_id, old_value, new_value, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            log.user_id,
            log.username,
            log.role,
            log.action,
            log.entity, 
            log.entity_id,
            log.old_value,
            log.new_value,
            log.created_at
        ];
        db.query(query, params, (err) => {
            if (err) {
                console.error("Error logging audit:", err);
            }   
            console.log("User:", user);
            console.log("Audit log recorded:", log);    
            next();
        });
    };
};
module.exports = auditLogger;
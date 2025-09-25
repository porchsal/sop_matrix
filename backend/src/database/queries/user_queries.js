const db = require('../connection.js');
const bcrypt = require('bcryptjs');

// const addUser = (username, first_name, last_name, password, profile) => {

//     return new Promise((resolve, reject) => {
//         bcrypt.hash(password, 10, (err, hash) => {
//             if (err) {
//                 console.error('Error hashing password:', err);
//                 return reject(err);
//             }
//             db.query('INSERT INTO users (username, first_name, last_name, password, profile) VALUES (?, ?, ?, ?, ?)', [username, first_name, last_name, hash, profile], (err, rows) => {
//                 if (err) {
//                     console.error('Database query error:', err);
//                     return reject(err);
//                 }
//                 resolve(rows);
//             });
//         });
//     });
// }


// Validates username
const validateUsername = (username) => {
    const usernameRegex = /^(?![_\.])[a-zA-Z0-9._]{5,}(?<![_\.])$/;
    return usernameRegex.test(username);
};

// Validates password
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

// Verifies if username exists
const usernameExists = async (username) => {
    const [rows] = await db.promise().query('SELECT COUNT(*) as count FROM users WHERE username = ?', [username]);
    return rows[0].count > 0; 
};

const addUser = async (username, first_name, last_name, password, role_id) => {
    try {
        if (!validateUsername(username)) {
            return { success: false, message: "Username must be at least 5 characters, letters, numbers." };
        }

        if (await usernameExists(username)) {
            return { success: false, message: "Username already in use, choose a different." };
        }

        if (!validatePassword(password)) {
            return { success: false, message: "Password must be at least 8 characters, include capital letters, small letters and numbers." };
        }

        const hash = await bcrypt.hash(password, 10);

        if(!role_id || isNaN(role_id)) {
            return { success: false, message: "Invalid role ID." };
        }

        const [rows] = await db.promise().query(
            'INSERT INTO users (username, first_name, last_name, password, role_id) VALUES (?, ?, ?, ?, ?)',
            [username, first_name, last_name, hash, role_id]
        );

        return rows;
    } catch (err) {
        console.error('Error en addUser:', err.message);
        throw err; 
    }
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
          if (err) {
              console.error('Database query error:', err);
              return reject(err);
          }
          resolve(rows[0]);
      });
  });
}

// const getUserById = (id) => {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT username FROM users WHERE id = ?', [id], (err, rows) => {
//             if (err) {
//                 console.error('Database query error:', err);
//                 return reject(err);
//             }
//             resolve(rows[0]);
//         });
//     });
// }

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT u.username, r.name AS profile
             FROM users u
             JOIN roles r ON u.role_id = r.id
             WHERE u.id = ?`,
            [id],
            (err, rows) => {
                if (err) {
                    console.error('Database query error:', err);
                    return reject(err);
                }
                if (rows.length === 0) {
                    return resolve(null); // User not found
                }
                resolve(rows[0]); // { username: '...', profile: '...' }
            }
        );
    });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users where id>1', (err, rows) => {
          if (err) {
              console.error('Database query error:', err);
              return reject(err);
          }
          resolve(rows);
      });
  });
}

const changePassword = (userId, password) => {
    return new Promise((resolve, reject) => {
        if (!validatePassword(password)) {
            return reject({ success: false, message: "Password must be at least 8 characters, include capital letters, small letters and numbers." });
        }

   
      bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
              console.error('Error hashing password:', err);
              return reject(err);
          }
          db.query('UPDATE users SET password = ? WHERE id = ?', [hash, userId], (err, rows) => {
              if (err) {
                  console.error('Database query error:', err);
                  return reject({ success: false, message: "Database error while updating password." });
              }
              if (rows.affectedRows === 0) {
                return reject({ success: false, message: "User ID not found or password not updated." });
            }
              resolve({ success: true, message: "Password updated successfully." });
          });
      });
  });
}

const checkLoginCredentials = (username, password) => {
  return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
          if (err) {
              console.error('Database query error:', err);
              return reject(err);
          }
          if (rows.length === 0) {
              return resolve(null);
          }
          bcrypt.compare(password, rows[0].password, (err, result) => {
              if (err) {
                  console.error('Error comparing passwords:', err);
                  return reject(err);
              }
              if (result) {
                  resolve(rows[0]);
                  
              } else {
                  resolve(null);
              }
          });
      });
  });
}

module.exports = {
    addUser,
    getUserByUsername,
    getUsers,
    getUserById,
    changePassword,
    checkLoginCredentials,
  };